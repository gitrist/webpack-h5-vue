const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolve = p => { return path.resolve(__dirname, "..", p); }

class LoaderFactory {
    constructor() {
        this.isProd = process.env.mode === 'production';
        this.loaders = [];
    }
    getVueLoader() {
        const VueLoader = {
            test: /\.vue$/,
            exclude: /node_modules/,
            use: {
                loader: 'vue-loader'
            }
        }
        return VueLoader;
    }
    getStyleLoader() {
        const StyleLoader = {
            test: /\.less|css$/,
            use: [{
                loader: this.isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                // options: {
                //     // 这里可以指定一个 publicPath
                //     // 默认使用 webpackOptions.output中的publicPath
                //     publicPath: '../'
                // },
            }, 'vue-style-loader','css-loader', 'less-loader']

        }
        return StyleLoader;
    }

    getImageLoader(){
        const ImageLoader = {
            test: /\.png|jpg|jpeg|gif$/,
            use:{
                loader: 'url-loader',
                options:{
                    name: '[name].[contentHash:5].[ext]',
                    limit: 10 * 1024,
                    outputPath: 'image'
                }
            }
        }
        return ImageLoader;
    }

    getFontLoader(){
        const FontLoader = {
            test: /\.eot|svg|ttf|woff|woff2$/,
            use:{
                loader: 'file-loader',
                options:{
                    name:'[name].[ext]',
                    outputPath: 'font'
                }
            }
        }
        return FontLoader;
    }

    getSvgLoader(){
        const SvgLoader = {
            test: /\.svg$/,
            use:{
                loader: 'svg-sprite-loader',
                options:{
                    symbolId: 'icon-[name]'
                }
            }
        }
        return SvgLoader;
    }
    getEslintLoader(){
        const EslintLoader = {
            test: /\.vue|js$/,
            include: [resolve('src')],
            enforce: 'pre',
            use: [
                {
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                        emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                        fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
                    }
                }
            ]
        }
        return EslintLoader;
    }

    getBabelLoader(){
        const BabelLoader = {
            test: /\.js$/,
            use:{
                loader:'babel-loader'
            },
            exclude:'/node_module/'
        }
        return BabelLoader;
    }

    getLoaders() {
        const VueLoader = this.getVueLoader();
        const StyleLoader = this.getStyleLoader();
        const ImageLoader = this.getImageLoader();
        const FontLoader = this.getFontLoader();
        const SvgLoader = this.getSvgLoader();
        const EslingLoader = this.getEslintLoader();
        const BabelLoader = this.getBabelLoader();
        this.loaders.push(
            VueLoader,
            StyleLoader,
            ImageLoader,
            FontLoader,
            SvgLoader,
            EslingLoader,
            BabelLoader
        )
        return this.loaders;
    }
}

module.exports = LoaderFactory; 