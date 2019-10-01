/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

declare module 'passport-google-oauth20' {
  import { Request } from 'express'
  import { Strategy as PassportStrategy } from 'passport'

  type Callback = (
    req: Request,
    authToken: string,
    refreshToken: string,
    userGoogleProfile: Profile,
    done: DoneFunction,
  ) => void

  type Config = {
    callbackURL: string
    clientID: string
    clientSecret: string
    passReqToCallback: boolean
  }

  type DoneFunction = (
    err: Error | null,
    userAuthId?: import('./user.d').default.Id,
  ) => void

  type Profile = {
    id: string
  }

  class Strategy extends PassportStrategy {
    public constructor(config: Config, callback: Callback)
  }
}
