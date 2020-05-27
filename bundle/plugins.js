const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Dotenv = require('dotenv-webpack');
const { NODE_ENV } = process.env;

class PluginFactory{
    constructor(){
        this.isProd = NODE_ENV === 'production';
        this.plugins = [];
    }
    getDllPlugins(){
        let dllPlugins = [];
        let dllFiles = fs.readdirSync(path.resolve(__dirname,`../dll/${NODE_ENV}`));
        dllFiles.forEach(fileName => {
            if (/.*\.dll\.js/.test(fileName)) {
                dllPlugins.push(
                    new AddAssetHtmlWebpackPlugin({
                        filepath: path.resolve(__dirname, `../dll/${NODE_ENV}`, fileName),
                        publicPath: '..'
                    })
                )
            }
            if (/.*\.mainfest\.json/.test(fileName)) {
                dllPlugins.push(
                    new webpack.DllReferencePlugin({
                        manifest: path.resolve(__dirname, `../dll/${NODE_ENV}`, fileName)
                    })
                )
            }
        });
        this.plugins.push(...dllPlugins);
    }

    getHtmlWebpackPlugin() {
        this.plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                title: process.env.SITE_TITLE
            })
        )
    }

    getMiniCssExtractPlugin() {
        if (this.isProd) {
            this.plugins.push(
                new MiniCssExtractPlugin({
                    filename: 'css/[name].[hash:5].css'
                })
            )
        }
    }

    getFriendlyErrorsWebpackPlugin() {
        this.plugins.push(
            new FriendlyErrorsWebpackPlugin()
        )
    }

    getDefinePlugin(){
        this.plugins.push(
            new webpack.DefinePlugin({
                "process.env.REACT_APP_ENV":JSON.stringify(process.env.REACT_APP_ENV),
            })
        )
    }

    // getDotenv() {
    //     this.plugins.push(
    //         new Dotenv({
    //             path: path.resolve(__dirname, `../enviroment/.env.${NODE_ENV}`)
    //         })
    //     );
    // }
    getProgressBarPlugin() {
        this.plugins.push(
            new ProgressBarPlugin()
        )
    }

    getVueLoaderPlugin(){
        this.plugins.push(new VueLoaderPlugin())
    }

    getPlugins() {
        this.getHtmlWebpackPlugin();
        this.getProgressBarPlugin();
        this.getVueLoaderPlugin();
        this.getMiniCssExtractPlugin();
        // this.getDotenv();
        this.getFriendlyErrorsWebpackPlugin();
        this.getDefinePlugin();
        // DLL 的插件放在最后 PUSH
        // this.getDllPlugins();
        return this.plugins;
    }
    
}

module.exports = PluginFactory;