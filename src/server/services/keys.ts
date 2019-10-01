/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

export const COOKIE_SESSION_SECRET = process.env.COOKIE_SESSION_SECRET

export const googleOauth = {
  CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
}

export const mongoDb = {
  DATABASE_NAME: process.env.MONGO_DB_DATABASE_NAME,
  URI: process.env.MONGO_DB_URI,
}
