const webpack = require('webpack');

const config = require('./webpack.config');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(config, {
  devtool: '#source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,

        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        }),

        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new DefinePlugin({
      ENV: JSON.stringify('production')
    }),

    new ExtractTextPlugin('[name].[chunkhash].css')
  ]
});
