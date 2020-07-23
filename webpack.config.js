const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.ts'],
    devtool: 'inline-source-map',
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
            use: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
        }, {
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
          }, {
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: ['file-loader']
        }]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    devServer: {
        contentBase: [
            path.join(__dirname, 'public'), 
            path.join(__dirname, 'assets')
        ],
        compress: true,
        port: 5000
    }
};