const path = require('path');
const merge = require('webpack-merge');
const MiniProgramPlugin = require('mini-program-webpack-loader').plugin;

const resolve = (file) => path.resolve(__dirname, '../', file);
global.context = resolve('src')

const baseConfig = require('./webpack.config.base');


module.exports = merge(baseConfig, {
  context: global.context,
  entry: resolve('src/app.json'),
  output: {
    path: resolve('dist')
  },
  plugins: [
    new MiniProgramPlugin()
  ],
});

