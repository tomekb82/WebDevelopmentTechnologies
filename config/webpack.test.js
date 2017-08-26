'use strict';

// Modules
const webpack = require('webpack');
const validate = require('webpack-validator');
const helpers = require('./helpers');

module.exports = {

  devtool: '#inline-source-map',

  module: {
    rules: [

{
                test: /\.js$/,
                use: [
                        { loader:'babel-loader?presets=es2015'}
                ],
                exclude: /(node_modules)/
      },

{
        test: /\.scss$/,
        use: [
                { loader: "style-loader"},
                { loader: "css-loader"},
                { loader: "sass-loader"}
        ],
        exclude: /(node_modules)/
      },


 {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.absolutePath('src/index.html')]
      },



    ]
  },

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: []

};
