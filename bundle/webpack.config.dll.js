const webpack =require('webpack');
const path =require('path');


const config = {
    mode:'production',
    entry:{
        Vue:['vue'],
        VueRouter:['vue-router'],
    },
    output:{
        filename:'[name].dll.js',
        library:'[name]'  // 通过全局变量暴露出去， vendors
    },
};
module.exports = (env,args) =>{
    process.env.NODE_ENV = args.mode;
    const { NODE_ENV } = process.env;
    config.output.path = path.resolve(__dirname,`../dll/${NODE_ENV}`);
    config.plugins = [
        // 使用webpack.DllPlugin进行分析，生成出一个映射文件
        new webpack.DllPlugin({
            name:'[name]',
            path:path.resolve(__dirname, `../dll/${NODE_ENV}/[name].mainfest.json`)
        }),
        // 通过全局变量，采用相应的 Vue 包
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        })
    ]
    return config;
}