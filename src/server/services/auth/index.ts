/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Application } from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { LOGIN_PATH } from '../../../consts/path'
import authCheckHandler from '../../middlewares/authCheck'

import { GOOGLE_STRATEGY_CONFIG, googleVerifyCallback } from './googleOauth'

const addAuth = (expressApp: Application): Application => {
  expressApp.use(passport.initialize())

  expressApp.use(passport.session())

  passport.serializeUser((userId, done) => {
    done(null, userId)
  })

  passport.deserializeUser((userId, done) => {
    done(null, userId)
  })

  passport.use(new GoogleStrategy(GOOGLE_STRATEGY_CONFIG, googleVerifyCallback))

  let callbackUrl: string

  expressApp.get('/auth/google', (req, res, next) => {
    callbackUrl = req.query && req.query.callback

    return passport.authenticate('google', {
      scope: ['email', 'profile'],
    })(req, res, next)
  })

  expressApp.get('/auth/google/callback', (req, res, next) =>
    passport.authenticate('google', {
      failureRedirect: callbackUrl
        ? `${LOGIN_PATH}?callback=${callbackUrl}`
        : LOGIN_PATH,
      successRedirect: callbackUrl || '/',
    })(req, res, next),
  )

  // Matches anything but "/login"
  expressApp.use(/(?!^\/login$)^\/.*$/, authCheckHandler)

  expressApp.get('/auth/logout', (req, res) => {
    req.session = undefined

    res.redirect(LOGIN_PATH)
  })

  expressApp.get(LOGIN_PATH, (req, res, next) => {
    if (req.session && req.session.passport && req.session.passport.user) {
      res.redirect('/')
    } else {
      next()
    }
  })

  return expressApp
}

export default addAuth
