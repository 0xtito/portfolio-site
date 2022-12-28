const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist/js"),
    publicPath: "/dist",
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|gif)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.gif$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
};
