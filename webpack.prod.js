'use strict';

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const mainConfig = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  return merge(mainConfig, {
    output: {
      filename: 'assets/[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    plugins: [
      // More info in https://webpack.js.org/guides/code-splitting-libraries/#manifest-file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        },
        FAKE_LOADS: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        sourceMap: true,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true,
          warnings: false
        },
        comments: false
      }),
      new ExtractTextPlugin({
        filename: 'assets/styles.[contenthash].css',
      }),
    ]
  })
}
