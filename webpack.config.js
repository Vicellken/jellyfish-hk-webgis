// avoid destructuring for older Node version support
const resolve = require("path").resolve;
const webpack = require("webpack");

const config = {
  mode: "development",

  devServer: {
    static: ".",
  },

  entry: {
    app: resolve("./src/app"),
  },

  output: {
    library: "App",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [resolve(".")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
