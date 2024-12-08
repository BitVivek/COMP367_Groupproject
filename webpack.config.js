const path = require('path');
const nodeExternals = require('webpack-node-externals'); // Import webpack-node-externals

module.exports = {
    entry: './server.js', // Adjust the entry point to your main server file
    target: 'node', // Indicate that we're building for Node.js
    externals: [nodeExternals()],
    mode: 'production', // Adjust the entry point as needed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // If you are using Babel
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};