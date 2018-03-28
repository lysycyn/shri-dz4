const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const styles = require('./webpack/styles');
const img = require('./webpack/img');
const javascript = require('./webpack/scripts');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
};

const isDevelopment = process.env.NODE_ENV;

const common = merge([
  {
    devtool:
      isDevelopment === 'development' ? 'inline-source-map' : 'source-map',
    entry: {
      index: `${PATHS.source}/index.js`,
    },
    output: {
      path: PATHS.build,
      filename: './scripts/[name].js',
      publicPath: '/',
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      }),
      new CleanWebpackPlugin('public'),
    ],
  },
  styles(isDevelopment),
  img(),
  javascript(isDevelopment),
]);

module.exports = (function () {
  return common;
}());
