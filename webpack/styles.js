const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

module.exports = (isDevelopment, paths) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            publicPath: path.join(__dirname, 'public'),
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader'],
          }),
        },
      ],
    },
    plugins:
      isDevelopment === 'development'
        ? [
          new ExtractTextPlugin('styles/style.css'),
          new StyleLintPlugin({
            configFile: './.stylelintrc',
          }),
        ]
        : [
          new ExtractTextPlugin('styles/style.css'),
          new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
              discardComments: {
                removeAll: true,
              },
              safe: true,
              map: { inline: false },
            },
          }),
          new StyleLintPlugin({
            configFile: './.stylelintrc',
          }),
        ],
  };
};
