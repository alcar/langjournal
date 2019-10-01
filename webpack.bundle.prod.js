/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

const VENDORS_CHUNKNAME = 'vendors'

const bundleProdConfig = {
  mode: 'production',
  entry: ['./src/client/index.tsx'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'build/assets'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: VENDORS_CHUNKNAME,
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new StatsWriterPlugin({
      filename: '../dynamicAssets.json',
      stats: {
        all: false,
        assets: true,
      },
      transform: ({ assetsByChunkName }) => {
        const TARGET_CHUNKNAMES = ['main', 'runtime', VENDORS_CHUNKNAME]

        const scripts = []
        const styles = []

        const includeAsset = asset => {
          if (/.+\.js$/.test(asset)) {
            scripts.push(asset)
          } else if (/.+\.css$/.test(asset)) {
            styles.push(asset)
          }
        }

        Object.entries(assetsByChunkName).forEach(([key, value]) => {
          if (TARGET_CHUNKNAMES.includes(key)) {
            if (Array.isArray(value)) {
              value.forEach(includeAsset)
            } else {
              includeAsset(value)
            }
          }
        })

        return JSON.stringify({ scripts, styles })
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../report.html',
    }),
  ],
  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
}

module.exports = merge.smartStrategy({ 'module.rules.use': 'prepend' })(
  require('./webpack.bundle.base'),
  bundleProdConfig,
)
