const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        }, {
            test: /\.(s*)css$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
        }, {
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};