//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './src/app',

        frameworks: ['jasmine-jquery', 'jasmine'],

        reporters: [
            // Reference: https://github.com/mlex/karma-spec-reporter
            // Set reporter to print detailed results to console
            'progress'
        ],

        files: [
            '../../node_modules/angular-test-runner/angular-test-runner.js',
            // Grab all files in the app folder that contain .spec. 
            './../tests.bundle.js',
            './../app/**/*.html'
        ],

        preprocessors: {
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            './../tests.bundle.js': ['webpack'],
            './../app/**/*.html': ['ng-html2js']
        },

        browsers: ['Chrome'],

        //singleRun: true,
        autoWatch: true,

        webpack: require('./config/webpack.test'),

        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: 'errors-only'
        },

        ngHtml2JsPreprocessor: {
            //stripPrefix: 'src/',
            moduleName: 'templates'
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-webpack',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
