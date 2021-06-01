const path = require('path');
const merge = require('webpack-merge');
const MiniPlugin = require('mini-program-webpack-loader').plugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolve = (file) => path.resolve(__dirname, '../', file);

global.context = resolve('src')

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    context: global.context,
    entry: resolve('src/app.json'),
    output: {
        path: resolve('dist')
    },
    resolve: {
// {
//     from: resolve('node_modules/@vant/weapp/dist'),
//         to: resolve('dist/@vant/weapp/dist')
// }
//         alias: {
//             '@vant/weapp': resolve("node_modules/@vant/weapp"),
//         }
    },
    plugins: [

        new CopyWebpackPlugin([
            {
                from: resolve('src/sitemap.json'),
                to: resolve('dist/sitemap.json')
            },
            {
                from: resolve('src/workers'),
                to: resolve('dist/workers')
            },
            {
                from: resolve('@vant/weapp'),
                to: resolve('dist/@vant/weapp')
            }
        ]),
        new MiniPlugin({
            compilationFinish: (err, stat, appJson) => {
                // 第一次编译才执行
                require('./copyImage.js').copyTo();
            }
        }),
    ],
});

