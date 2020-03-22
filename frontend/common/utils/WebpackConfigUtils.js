const PATH = require('path');

module.exports = class WebpackConfigUtils {

    /**
     *
     * @param dirname {string}
     * @param mode {string}
     * @param templateFile {string}
     * @param port {number}
     * @returns {{mode: string, output: {path: string, filename: string}, devServer: {compress: boolean, port: number}, entry: string, plugins: [*, *], module: {rules: [{test: RegExp, loader: string, query: {presets: [string]}, exclude: RegExp}, {test: RegExp, loader: string}]}, context: string}}
     */
    static createWebpackConfig ({
        dirname,
        mode = 'development',
        port = 3000,
        webpack,
        HtmlWebpackPlugin
    } = {}) {

        if (!dirname) throw new TypeError(`You must provide dirname`);

        if (!webpack) throw new TypeError(`You must provide webpack`);

        if (!HtmlWebpackPlugin) throw new TypeError(`You must provide HtmlWebpackPlugin`);

        const name = PATH.basename(dirname);
        const context = PATH.join(dirname, "src");
        const templateFile = `${name}-template.html`;
        const entry = `./${name}-main`;
        const distDir = PATH.join(dirname, 'dist');
        const bundleFilename = `${name}-bundle.js`;

        return {
            mode,
            context,
            entry,
            output: {
                path: distDir,
                filename: bundleFilename
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
                    'process.env.NODE_ENV': JSON.stringify(mode)
                }),
                new HtmlWebpackPlugin({
                    template: templateFile,
                    inject: 'head'
                })
            ],
            devServer: {
                contentBase: distDir,
                compress: true,
                port
            }
        };

    }

};
