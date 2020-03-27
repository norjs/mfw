const PATH = require('path');

module.exports = class WebpackConfigUtils {

    /**
     *
     * @param dirname {string}
     * @param mode {string}
     * @param templateFile {string}
     * @param port {number}
     * @param proxy {Object.<string, string>} The proxy configurations
     * @returns {{mode: string, output: {path: string, filename: string}, devServer: {compress: boolean, port: number, contentBase: string}, entry: string, plugins: [*, *], module: {rules: [{test: RegExp, loader: string, query: {presets: [string]}, exclude: RegExp}, {test: RegExp, loader: string}]}, context: string}}
     */
    static createWebpackConfig ({
        dirname,
        mode = 'development',
        port = 3000,
        webpack,
        HtmlWebpackPlugin,
        proxy = {}
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
                // , publicPath: '/'
            },
            module: {
                rules: [
                    {
                        test: /\.scss$/i,
                        use: [
                            'style-loader',   // Creates `style` nodes from JS strings
                            'css-loader',     // Translates CSS into CommonJS
                            'sass-loader'     // Compiles Sass to CSS
                        ]
                    },
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
                    // base: '/',
                    template: templateFile,
                    inject: 'head'
                })
            ],
            devServer: {
                contentBase: distDir,
                compress: true,
                port,
                proxy
            }
        };

    }

    /**
     * Creates proxy configuration object for webpack-dev-server.
     *
     * @param basePath {string}
     * @param ports {Object.<string, number>}
     * @returns {Object.<string, string>}
     */
    static createWebpackDevServerProxyObject (basePath = '', ports) {

        return Object.keys(ports).filter(key => key !== "core").reduce((obj, key) => {

            const path = `${basePath}/${key}`;
            const port = ports[key];
            const url = `http://localhost:${port}`;

            obj[path] = {
                target: url,
                pathRewrite: {
                    [`^${path}`] : ''
                }
            };

            return obj;
        }, {});

    }

};
