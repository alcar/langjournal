/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

import webpack, { Configuration } from 'webpack'
import merge from 'webpack-merge'

import { ASSETS_PATH } from './src/consts/path'

const bundleDevConfig: Configuration = {
  mode: 'development',
  entry: ['./src/client/index.tsx', 'webpack-hot-middleware/client'],
  output: {
    filename: 'bundle.js',
    publicPath: ASSETS_PATH,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
}

export default merge.smart(require('./webpack.bundle.base'), bundleDevConfig)
