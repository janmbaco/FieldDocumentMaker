const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const dist = "../FieldDocumentMaker.WPF/htmlView";
module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    module: {
        rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.html$/,
                use: [{
                  loader: 'html-loader',
                  options: {
                    minimize: true
                  }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(dist),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/app.html'
        })
    ]
};