const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:
    {
        
        index: "./source/index.js",
        polys: [
            "babel-polyfill",
            "promise-polyfill",
            "fetch-polyfill"
        ],
        blogClient: "./source/blogClient.jsx"
    }
    ,
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: ["react", "env", "es2015-ie" ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};