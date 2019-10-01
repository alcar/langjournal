/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const merge = require('webpack-merge')

const bundleBaseConfig = {
  output: {
    libraryTarget: 'umd',
  },
}

module.exports = merge(require('./webpack.common'), bundleBaseConfig)
