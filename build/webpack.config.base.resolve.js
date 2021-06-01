const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

module.exports = {
  alias: {
    "@": path.resolve('src'),
    "@vant": path.resolve('@vant'),
  }
};
