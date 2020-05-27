const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
let localEnv = {
    WEBPACK_DEV_HOST: '127.0.0.1',
};
const {NODE_ENV} = process.env;

try {
    const localEnvPath = path.resolve(__dirname, './environment/.env.local');
    localEnvBuffer = fs.readFileSync(localEnvPath);
    localEnv = {
        ...localEnv,
        ...dotenv.parse(localEnvBuffer)
    }
} catch (error) {
    console.log('(⊙o⊙)… 解析本地配置文件失败，将使用默认配置...');
} finally {
    for (let attr in localEnv) {
        process.env[attr] = localEnv[attr];
    }
}
dotenv.config({
    path: path.resolve(__dirname, `enviroment/.env.${NODE_ENV}`)
});
module.exports = require(`./bundle/webpack.config.${NODE_ENV}.js`);



