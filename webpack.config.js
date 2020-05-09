const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

const gitRevisionPlugin = new GitRevisionPlugin();

const mode = () => {
  if (process.env.NODE_ENV === "development") {
    return { mode: "development" };
  }

  if (process.env.NODE_ENV === "production") {
    return { mode: "production" };
  }

  return {};
};

const devtool = () => {
  if (process.env.NODE_ENV === "development") {
    return { devtool: "inline-source-map" };
  }

  if (process.env.NODE_ENV === "production") {
    return { devtool: "source-map" };
  }

  return {};
};

const devServer = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      devServer: {
        contentBase: "./dist",
        open: false,
      },
    };
  }

  return {};
};

module.exports = {
  ...mode(),
  ...devtool(),
  ...devServer(),

  entry: "./src/index.js",

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Snail 6",
      template: "index.html",
      version: gitRevisionPlugin.commithash().slice(0, 7),
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
