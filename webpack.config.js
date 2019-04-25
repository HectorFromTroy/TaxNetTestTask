'use strict';

const path = require("path");

module.exports = {

  //default value of entry point for beginning building depend graph
  //for each HTML document use exactly one entry point.
  entry: ['babel-polyfill', "./src/index.jsx"],   

  output: {//bundles will be emmited here
    path: __dirname,//path.resolve(__dirname, "dist"),//resolve method returns absolute path
    filename: "main.js"//main.js is default name
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query:{
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.sass$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: ["file-loader"]
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    watchContentBase: true,
    progress: true
  },

  plugins:[
    //here should be plugins
  ],

  mode: "development", //development, production or none for webpack's built-in optimizations

  target: "web"//to compile for web-like environment, it is default value

};