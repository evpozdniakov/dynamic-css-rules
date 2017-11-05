const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    library: 'applyCssRule',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'dynamic-css-rules.min.js'
  },
  plugins: [
    new UglifyJSPlugin({
      // https://www.npmjs.com/package/uglify-js
    }),
    new CompressionPlugin({
      regExp: /\.js$/,
      minRatio: 0.9,
    })
  ]
};
