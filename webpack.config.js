const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: ['./client'],
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'],
            },
          }],
          ['@babel/preset-react', {
            runtime: 'automatic', importSource: '@emotion/react',
          }],
        ],
        plugins: ['@emotion/babel-plugin']
      },
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '', 'index.html'),
    }),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/dist',
  },
};