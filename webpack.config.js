const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, "./front/index.html"),
});

module.exports = {
  entry: ["@babel/polyfill", "./front/index.js", "./front/index.scss"],
  output: {
    path: path.join(__dirname, ".public/base"),
    publicPath: "/",
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("index.css"), HTMLWebpackPluginConfig]
};
