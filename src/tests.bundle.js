/*
 * When testing with Webpack and ES6, we have to do some
 * preliminary setup. Because we are writing our tests also in ES6,
 * we must transpile those as well, which is handled inside
 * `karma.conf.js` via the `karma-webpack` plugin. This is the entry
 * file for the Webpack tests. Similarly to how Webpack creates a
 * `bundle.js` file for the compressed app source files, when we
 * run our tests, Webpack, likewise, compiles and bundles those tests here.
*/

import angular from 'angular';

// Built by the core Angular team for mocking dependencies
import mocks from 'angular-mocks';

import router from 'angular-ui-router';

import app from './../../src/app/app.js'


let context = require.context('.', true, /\.spec\.js/);

// Get all files, for each file, call the context function
// that will require the file and load it here. Context will
// loop and require those spec files here.
context.keys().forEach(context);
