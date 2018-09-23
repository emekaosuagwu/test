 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './src/server.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
     module: {
       rules: [
         { 
         	test: /\.js$/, 
         	exclude: /node_modules/, 
         	loader: "babel-loader" 
         }
       ]
     }
 };