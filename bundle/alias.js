const path = require('path');

function getAlias(){
    let paths = {
        "@/": ["/"],
        "@/*": ["*"],
    }
    let alias = {};
    for(let attr in paths){
        const aliasKey = attr.replace(/\/\*$/,'');
        let [ aliasValue ] = paths[attr];
        if(aliasValue === '*') aliasValue = 'src';
        else aliasValue = 'src/' + aliasValue.replace(/\/\*$/,'');
        alias[aliasKey] = path.resolve(__dirname,'..',aliasValue);
    }
    return alias;
}

module.exports = getAlias;
