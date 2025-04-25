const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  resolve: {
    extensions: [".jsx", ".js"],
  },

  entry: {
    app: ["./client"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"],
                },
              },
            ],
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
                importSource: "@emotion/react",
              },
            ],
          ],
          plugins: ["@emotion/babel-plugin", "react-refresh/babel"],
        },
      },
    ],
  },

  plugins: [new ReactRefreshWebpackPlugin()],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist",
  },

  devServer: {
    historyApiFallback: true,
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
    liveReload: false,
  },
};
