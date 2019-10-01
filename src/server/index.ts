/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import 'regenerator-runtime/runtime'

import { makeExecutableSchema } from 'apollo-server-express'
import compression from 'compression'
import cookieSession from 'cookie-session'
import express from 'express'
import { MongoClient } from 'mongodb'
import path from 'path'
import serveFavicon from 'serve-favicon'

import { ASSETS_PATH } from '../consts/path'

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import errorHandler from './middlewares/error'
import handleSsr from './middlewares/ssr'
import addAuth from './services/auth'
import addGraphql from './services/graphql'
import addHmr from './services/hmr'
import { COOKIE_SESSION_SECRET, mongoDb } from './services/keys'
import { isDevelopment } from './utils/env'

const schema = makeExecutableSchema({ resolvers, typeDefs })

const app = express()

app.use(compression())

app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    name: 'session',
    secret: COOKIE_SESSION_SECRET,
  }),
)

if (isDevelopment) {
  addHmr(app)
}

app.use(serveFavicon(path.join(__dirname, 'assets/favicon.ico')))

app.use(
  ASSETS_PATH,
  express.static(path.join(__dirname, 'assets'), { index: false }),
)

addAuth(app)

addGraphql(app, schema)

app.use((req, res, next) => handleSsr(req, res, next, schema))

app.use(errorHandler)

MongoClient.connect(
  mongoDb.URI || '',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, result) => {
    if (err) {
      throw err
    }

    app.locals.db = result.db(mongoDb.DATABASE_NAME)

    const PORT = process.env.PORT || 3000

    app.listen({ port: PORT }, () => {
      process.stdout.write(`\nServer running @ port ${PORT}!\n`)
    })
  },
)
