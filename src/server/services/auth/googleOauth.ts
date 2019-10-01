/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Request } from 'express'
import { DoneFunction, Profile } from 'passport-google-oauth20'

import { googleOauth } from '../../services/keys'

import { findAuthData, insertAuthData } from './database'

export const GOOGLE_STRATEGY_CONFIG = {
  callbackURL: '/auth/google/callback',
  clientID: googleOauth.CLIENT_ID || '',
  clientSecret: googleOauth.CLIENT_SECRET || '',
  passReqToCallback: true,
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
}

export const googleVerifyCallback = async (
  req: Request,
  _: string,
  __: string,
  userGoogleProfile: Profile,
  done: DoneFunction,
): Promise<void> => {
  const db = req.app.locals.db

  const GOOGLE_ID_KEY = 'google'

  const userGoogleId = userGoogleProfile.id

  const authObj = { [GOOGLE_ID_KEY]: userGoogleId }

  try {
    const userAuthData = await findAuthData(authObj, db)

    if (userAuthData) {
      const existingUserAuthId = userAuthData._id

      done(null, existingUserAuthId)
    } else {
      const newUserAuthData = await insertAuthData(authObj, db)

      const newUserAuthId = newUserAuthData._id

      done(null, newUserAuthId)
    }
  } catch (err) {
    done(err)
  }
}
