const path = require('path')
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = webpackMerge(baseConfig,{
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: process.env.WBPACK_DEV_SERVER_HOST,
        port: process.env.WBPACK_DEV_SERVER_PORT,
        contentBase: path.resolve(__dirname,'../build'),
        open: false,
        overlay: {
            errors:true,
            warnings:true
        },
        // historyApiFallback: true, hash路由关闭
        hot: true,
        stats: 'minimal',
    }
});