const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    library: 'applyCssRule',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'dynamic-css-rules.js'
  }
};
