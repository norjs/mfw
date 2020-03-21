const PATH = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const FRONTEND_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const FRONTEND_CONTENT_BASE = PATH.join(__dirname, 'dist');

module.exports = {
    mode: FRONTEND_ENV,
    context: PATH.join(__dirname, "src"),
    entry: "./core-main",
    output: {
        path: PATH.join(__dirname, "dist"),
        filename: "core-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env']
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(FRONTEND_ENV)
        }),
        new HtmlWebpackPlugin({
            template: 'core-template.html',
            inject: 'head'
        })
    ],
    devServer: {
        contentBase: FRONTEND_CONTENT_BASE,
        compress: true,
        port: FRONTEND_PORT
    }
};
