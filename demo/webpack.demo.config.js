// jshint esversion: 6 -
const path = require('path');
const webpack = require('webpack');

const config = {
    target: 'web',
    entry:  { './demo/app.js': './demo/index' },
    //basePath: __dirname,
    plugins: [],

    output: {
//        path: '.',
        publicPath: '',
        sourcePrefix: '',
        filename: '[name]?v=[hash]',
        chunkFilename: 'chunk-[name]-[id].js?v=[hash]'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [
                    [ 'es2015', { modules: false } ],
                    'react'
                ],
                plugins: [
                    'transform-class-properties',
                    [ 'transform-object-rest-spread', { useBuiltIns: true } ],
                ],
                cacheDirectory: true
            }
        },{
            test: /\.css$/,
            loader: [ 'style-loader', 'css-loader' ]
        }]
    }


};


module.exports = config;
