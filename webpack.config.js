const path = require('path');
const webpack  = require('webpack');
const dotenv  = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

module.exports = {
    mode: 'development',
    entry: "./src/index.js", // bundle's entry point
    output: {
        path: path.resolve(__dirname, 'dist'), // output directory
        filename: "[name].js" // name of the generated bundle
    },
    devServer: {
        historyApiFallback: true,
      },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: true,
        },
        runtimeChunk: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ["style-loader","css-loader"]
            },
            {
                test: /\.scss$/,
                loader: ["style-loader?sourceMap","css-loader?sourceMap","sass-loader?sourceMap"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader','eslint-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader',
                ],
            },
        ]
    },
    plugins: [ new HtmlWebpackPlugin({ template: "src/index.html", inject : "body" }),   new webpack.DefinePlugin({
        'process.env.BACKEND_LINK': JSON.stringify(process.env.BACKEND_LINK),
      }), ],
    devtool: 'source-map',
};
