/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const serverBaseConfig = {
  target: 'node',
  entry: './src/server/index.ts',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
  },
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals({
      whitelist: /\.css$/,
    }),
  ],
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new CopyPlugin([{ from: 'src/server/assets', to: 'assets' }]),
  ],
  stats: 'errors-only',
}

module.exports = merge(require('./webpack.common'), serverBaseConfig)
