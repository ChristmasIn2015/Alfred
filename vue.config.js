// * Node glob 模块允许你使用 *等符号, 来解析匹配路径
// * glob.sync: Array 用于同步获取匹配的文件列表
// * 这个方法用于获取多页项目下的所有Webpack入口文件
function getPages() {
    let viewsMap = {}
    let webpackJsEntryList = require('glob').sync('./src/webapps/*/*.js')
    webpackJsEntryList.forEach((filepath) => {
        let fileList = filepath.split('/')
        let projectName = fileList[fileList.length - 2]
        viewsMap[projectName] = {
            entry: `src/webapps/${projectName}/main.js`, // Webpack 打包入口
            template: `src/public/index.html`, // Html-webpack-plugin 插件的模板来源
            filename: `${projectName}.html`, // 在 dist/index.html 的输出
            chunks: ['chunk-vendors', 'chunk-common', projectName], // 提取出来的通用 chunk 和 vendor chunk。
        }
    })
    return viewsMap
}
module.exports = {
    // ** 200811 本地通过 file:// 加载单页成功 **
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

    // ** 多页模式 **
    pages: getPages(),
}
