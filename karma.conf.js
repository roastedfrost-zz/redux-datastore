// jshint esversion: 6

const path = require('path');
module.exports = function(config) {
    const webpackConfig = {
        entry: './lib/index.js',
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        [ 'es2015', { modules: false } ]
                    ],
                    plugins: [
                        [ 'transform-object-rest-spread', { useBuiltIns: true } ],
                    ],
                    cacheDirectory: true
                }
            }]
        }
    };

    config.set({
        logLevel: config.LOG_WARN,
        basePath: './lib',
        files: [
            require.resolve('babel-polyfill/dist/polyfill'),
            {
                pattern: '**/test/*.js',
                watched: false
            }
        ],
        frameworks: [ 'mocha', 'chai' ],
        preprocessors: {
            '**/*.js' : [ 'webpack' ]
        },
        client: {
            captureConsole: true,
            showDebugMessages: true,
            mocha: {
                ui: 'bdd',
                timeout: 5000
            }
        },
        singleRun: false,
        autoWatch: true,
        reporters: [ 'mocha' ],
        browsers: [ 'PhantomJS' ],
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        }
    });
};
