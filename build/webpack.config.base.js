const webpack = require('webpack');
const baseResolve = require('./webpack.config.base.resolve');
const baseLoaders = require('./webpack.config.base.loaders');

module.exports = {
  mode: 'production', // production | development
  target: 'node',
  devtool: false,
  watchOptions: {
    ignored: /node_modules|dist/,
    poll: 1000
  },
  resolve: baseResolve,
  module: { rules: baseLoaders },
  optimization: {
    // minimize: false,
    // 始终开启压缩，以保证在开发模式可以预览
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    },
    concatenateModules:false
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
    })
  ]
};
