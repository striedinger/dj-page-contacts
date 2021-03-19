const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    bundle: {
      import: path.join(__dirname, 'src', 'index.js'),
      dependOn: 'vendor',
    },
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
};
