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
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\*\/*\/\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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