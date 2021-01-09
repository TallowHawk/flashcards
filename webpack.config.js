const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: "(typeof self!='undefined'?self:global)",
        publicPath: '/',
    },

    devtool: 'eval-source-map',

    devServer: {
        hot: true,
        inline: true,
        host: 'localhost',
        contentBase: path.join(__dirname, 'server/public'),
        port: 3010,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        stats: {
            chunks: false,
            modules: false,
        },
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-react-jsx', {
                                pragma: 'h',
                                pragmaFrag: 'Fragment'
                            }],
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                exclude: /node_modules/,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                exportLocalsConvention: "camelCase",
                            },                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                use: 'url-loader'
            },
            {
                test: /\.(otf|svg)(\?.*$|$)/,
                use: 'file-loader'
            },
            {
                test: /\.ejs$/i,
                exclude: /node_modules/,
                loader: 'ejs-loader',
                options: {
                    esModule: false,
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Flashcards',
            template: 'src/index.ejs',
        }),
        new webpack.ProvidePlugin({
            h: ['preact', 'h'],
        })
    ],
}
