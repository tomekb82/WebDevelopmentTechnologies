//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: 'src/app',

        files: [
            '../../node_modules/angular/angular.js',
            '../../node_modules/angular-ui-router/release/angular-ui-router.js',
            '../../node_modules/angular-mocks/angular-mocks.js',
            '../../node_modules/angular-test-runner/angular-test-runner.js',
            '../../node_modules/sinon/lib/sinon.js',
            '../../node_modules/lodash/lodash.js', 
            '../../src/app/**/*.spec.js',
            '../../src/app/**/*.html' // this is necessary if we want to test htmls from "templateUrl" 
 
	],

        autoWatch: true,

        frameworks: ['jasmine-jquery', 'jasmine'],

        browsers: ['Chrome'],

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
        },

        preprocessors: {
            '../../src/app/**/*.js': ['webpack'],
            '../../src/app/**/*.html': ['ng-html2js'] // this is necessary if we want to test htmls from "templateUrl"

        },
        ngHtml2JsPreprocessor: { // this is necessary if we want to test htmls from "templateUrl"
            moduleName: 'templates' // define module name containing our htmls - it must be include to test if we want to test "templateUrl"
        },
        webpack: {
            module: {
                loaders: [
                    {test: /\.js/,  loader: 'babel-loader'},
                ]
            },
            watch: true
        },

    });
};
