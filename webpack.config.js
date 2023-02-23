const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== "production";

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
      hot: true,
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.(ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              compact: !isDevelopment,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./index.html" }), //
      new MiniCssExtractPlugin({ filename: "style.css" }),
    ],
    performance: {
      hints: isDevelopment ? "warning" : "error",
    },
  };
};
