var path = require('path');

module.exports = {
  // Change to your "entry-point".
  entry: './src/xethya',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'xethya.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      // Include ts, tsx, and js files.
      test: /\.(tsx?)|(js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  }
};