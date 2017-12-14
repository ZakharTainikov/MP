const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:
    {
        task1: "./source/Task1.js",
        task2: "./source/Task2.js",
        polys: [
            "babel-polyfill",
            "promise-polyfill",
            "fetch-polyfill"
        ]
    }
    ,
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/MP/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "es2015-ie"]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
