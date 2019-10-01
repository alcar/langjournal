/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Application } from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackBundleDevConfig from '../../../webpack.bundle.dev'
import { ASSETS_PATH } from '../../consts/path'

const webpackCompiler = webpack(webpackBundleDevConfig)

const addHmr = (expressApp: Application): Application => {
  expressApp.use(
    webpackDevMiddleware(webpackCompiler, {
      publicPath:
        (webpackBundleDevConfig.output &&
          webpackBundleDevConfig.output.publicPath) ||
        ASSETS_PATH,
    }),
  )

  expressApp.use(webpackHotMiddleware(webpackCompiler))

  return expressApp
}

export default addHmr
