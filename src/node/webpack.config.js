// * 清空dist目录
const distPath = require('path').join(__dirname, 'dist')
require('fs-extra').emptyDirSync(distPath)

// * 获取所有打包入口
function getEntrys() {
    let list = require('glob').sync('./src/node/apps/*/*.js')
    let entrys = {}
    list.forEach((e) => {
        entrys[`${e.split('/').reverse()[1]}`] = e
    })
    return entrys
}

// * 不希望打包 node_modules 中的库
var nodeModules = {}
require('fs')
    .readdirSync('node_modules')
    .filter((e) => {
        return ['.bin'].indexOf(e) === -1
    })
    .forEach((mod) => (nodeModules[mod] = 'commonjs ' + mod))

// * 打包~~
module.exports = {
    mode: 'production',
    entry: getEntrys(),
    output: {
        path: distPath,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['babel-loader'],
            },
        ],
    },
    target: 'node',
    externals: nodeModules,
}
