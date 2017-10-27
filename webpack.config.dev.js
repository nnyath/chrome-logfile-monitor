
var path = require('path');
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
require("babel-polyfill");


module.exports = {
  entry: {
    background:['babel-polyfill','./background.js'],
    content:'./content.js'
  },
  watch : true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer:{
    contentBase: path.resolve(__dirname, 'test'),
  },
  resolve: {
    extensions: ['.js', '.scss', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
      // {
      //   test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
      //   use: {
      //     loader:'file-loader',
      //     options: {
      //       // name: '/assets/[name].[ext]'
      //     }
      //   },
      // }
    ]
  },
  plugins:[
    new CopyWebpackPlugin([
      { from: './manifest.json', to: './' },
      { from: './img/*.png', to:'./'},
      { from: './popup.html', to:'./' }
    ])
  ]
};