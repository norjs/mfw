const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackConfigUtils = require("../common/utils/WebpackConfigUtils");

const PORTS = require('../ports.json');

const PROXY = WebpackConfigUtils.createWebpackDevServerProxyObject("/views", PORTS);

module.exports = WebpackConfigUtils.createWebpackConfig({
    dirname: __dirname,
    publicPath: '/',
    env: process.env.NODE_ENV || 'development',
    port: process.env.FRONTEND_PORT || PORTS.core,
    webpack,
    HtmlWebpackPlugin,
    proxy: PROXY
});
