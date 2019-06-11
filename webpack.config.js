/*
    Some configs relied on codebases:
    - https://github.com/rokoroku/react-redux-typescript-boilerplate/
    - https://medium.com/dailyjs/typescript-babel-ce24f724398
    - https://webpack.js.org/guides/caching/

    More about TypeScript
    - https://iamturns.com/typescript-babel/
*/

const path = require('path');
const webpack = require('webpack');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
const SOURCE_PATH = path.resolve(__dirname, 'src');
const ENVIRONMENT = process.env.NODE_ENV || 'development';

const isProduction = ENVIRONMENT === 'production';
const plugins = [
    new CleanWebpackPlugin(DIST_PATH),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
        template: './index.html',
    }),
];

if (isProduction) {
    plugins.push(
        new OptimizeCssAssetsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
    );
}

module.exports = {
    bail: true,
    context: SOURCE_PATH,
    entry: {
        app: './index.tsx',
    },
    output: {
        path: DIST_PATH,
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    devtool: isProduction ? false : 'source-map',
    resolve: {
        extensions: ['.js', '.tsx', '.ts', '.json'],
        alias: {
            app: __dirname + '/src/app',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            sourceMap: !isProduction,
                            localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                './src',
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:base64:5].[ext]',
                            outputPath: 'static',
                        }
                    }
                ]
            },
        ],
    },
    plugins,
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
// Other configs
    devServer: {
        contentBase: DIST_PATH,
        publicPath: '/',
        logLevel: 'debug',
        proxy: {
            '/': {
                target: 'http://localhost:9000',
            },
        },
        historyApiFallback: true,
    },
};
