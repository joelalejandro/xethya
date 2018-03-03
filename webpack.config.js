var path = require('path');
var webpack = require('webpack');

module.exports = {
  // Change to your "entry-point".
  entry: './src/xethya',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'xethya.js', 
    libraryTarget: 'var',
    library: 'Xethya',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
  module: {
    rules: [{
      // Include ts, tsx, and js files.
      test: /\.(tsx?)$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader',
      query: {
        declaration: false,
      }      
    }],
  }
};