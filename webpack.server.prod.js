/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

const merge = require('webpack-merge')

const serverProdConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['isomorphic-style-loader'],
        exclude: /node_modules/,
      },
    ],
  },
}

module.exports = merge.smartStrategy({ 'module.rules.use': 'prepend' })(
  require('./webpack.server.base'),
  serverProdConfig,
)
