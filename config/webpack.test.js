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
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code  
        test: /\.js$/,
        use: [
          {loader:'babel-loader?presets=es2015'}
        ],
        exclude: /(node_modules)/
      },

      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"}
        ],
        exclude: /(node_modules)/
      },
      {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use:[
          {loader: "file-loader"}
        ],
        exclude: /(node_modules)/
      },
      {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.absolutePath('src/index.html')]
      }
    ]
  },

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: []

};
