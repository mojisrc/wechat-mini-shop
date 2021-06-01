const path = require('path');
const merge = require('webpack-merge');
const MiniProgramPlugin = require('mini-program-webpack-loader').plugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = (file) => path.resolve(__dirname, '../', file);
global.context = resolve('src/plugin');

const baseConfig = require('./webpack.config.base');

module.exports = [merge(baseConfig, {
  context: global.context,
  entry: resolve('src/plugin/plugin.json'),
  output: {
    path: resolve('dist/plugin')
  },
  plugins: [
    new MiniProgramPlugin({
      forPlugin: true
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('doc'),
        to: resolve('dist/doc')
      },
      {
        from: resolve('project.config.json'),
        to: resolve('dist/project.config.json')
      },
      {
        from: resolve('assets'),
        to: resolve('dist/assets')
      }
    ])
  ]
}), merge(baseConfig, {
  context: global.context,
  entry: {
    index: resolve('src/plugin/index')
  },
  output: {
    path: resolve('dist/plugin'),
    libraryTarget: 'umd'
  }
})];
