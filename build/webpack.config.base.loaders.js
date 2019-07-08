const path = require('path');

const fileLoader = name => ({
  loader: 'file-loader',
  options: {
    publicPath: '',
    context: global.context || path.resolve(__dirname, '../src'),
    name
  }
});

module.exports = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, '../plugin'),
    exclude: path.resolve(__dirname, '../node_modules'),
    use: [
      'cache-loader',
      'babel-loader',
      // 'eslint-loader',
    ],
  },
  {
    test: /.wxml/,
    use: [
      fileLoader('[path][name].[ext]'),
      'mini-program-webpack-loader',
    ]
  },
  {
    test: /\.wxss$/,
    use: [
      fileLoader('[path][name].[ext]'),
      'mini-program-webpack-loader',
    ]
  },
  {
    test: /\.scss$/,
    use: [
      fileLoader('[path][name].wxss'),
      'sass-loader'
    ]
  },
  {
    test: /\.pcss$/,
    use: [
      fileLoader('[path][name].wxss')
    ]
  },
  {
    test: /.wxs$/,
    use: [
      fileLoader('[path][name].[ext]'),
      'babel-loader',
      'mini-program-webpack-loader',
    ]
  },
  {
    test: /\.json/,
    type: 'javascript/auto',
    use: [
      fileLoader('[path][name].[ext]'),
      'mini-program-webpack-loader'
    ]
  },
  {
    test: /\.(png|jpg|gif)$/,
    include: /src/,
    use: fileLoader('[path][name].[ext]')
  }
];
