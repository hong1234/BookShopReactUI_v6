const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "/src/index.js", // main js
  output: {
    path: path.resolve(__dirname, "dist"), // output folder
    filename: 'bundle.js',
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env", 
              // "@babel/preset-react"
              ["@babel/preset-react", {"runtime": "automatic"}]
            ],
          },
        },
      },
      {
        // test: /\.css$/,
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader", // for styles
          "sass-loader"
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // base html
    }),
  ],
  devServer: {
    hot: true,
    port: 3000,
    open: true
  }
};