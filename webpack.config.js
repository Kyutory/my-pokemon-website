const path = require('path');

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

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
};