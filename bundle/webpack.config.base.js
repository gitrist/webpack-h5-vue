const path = require('path');
const LoaderFactory = require("./loaders");
const PluginFactory = require("./plugins");
const getAlias = require("./alias");

module.exports = {
    entry: path.resolve(__dirname,"..","src/main.js"),
    output: {
        filename: 'js/[name].[hash:5].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            ...new LoaderFactory().getLoaders()
        ],
    },
    resolve: {
        extensions: ['.vue', '.js'],
        alias: {
            ...getAlias(),
            vue: "vue/dist/vue.js",
        }
    },
    plugins: [
        ...new PluginFactory().getPlugins()
    ],
}