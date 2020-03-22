const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackConfigUtils = require("../common/utils/WebpackConfigUtils");

module.exports = WebpackConfigUtils.createWebpackConfig({
    dirname: __dirname,
    publicPath: '/',
    env: process.env.NODE_ENV || 'development',
    port: process.env.FRONTEND_PORT || require('../ports.json').nav,
    webpack,
    HtmlWebpackPlugin
});
