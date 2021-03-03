const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const dist = "../FieldDocumentMaker.WPF/Resources";
module.exports = {
    entry: './src/app.ts',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader',
                    options: { injectType: 'singletonStyleTag' },
                }, 
                'css-loader'
            ],
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
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/app.html'
        })
    ]
};