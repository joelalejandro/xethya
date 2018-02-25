var path = require('path');
var webpack = require('webpack');

module.exports = {
  // Change to your "entry-point".
  entry: './src/xethya',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', 
    libraryTarget: 'umd',
    library: 'Xethya',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    })
  ],  
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