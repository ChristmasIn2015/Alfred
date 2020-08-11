// * Node glob 模块允许你使用 *等符号, 来解析匹配路径
// * glob.sync: Array 用于同步获取匹配的文件列表
const glob = require('glob')

// * 这个方法用于获取多页项目下的所有Webpack入口文件
function getPages() {
    let viewsMap = {}
    let webpackJsEntryList = glob.sync('./src/apps/*/*.js')
    webpackJsEntryList.forEach((filepath) => {
        let fileList = filepath.split('/')
        let projectName = fileList[fileList.length - 2]
        viewsMap[projectName] = {
            // Webpack 入口文件
            entry: `src/apps/${projectName}/${projectName}.js`,
            // Html-webpack-plugin 插件的模板来源
            template: `src/apps/${projectName}/${projectName}.html`,
            // template: `./public/index.html`,
            // 在 dist/index.html 的输出
            filename: `${projectName}.html`,
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', projectName],
        }
    })
    return viewsMap
}
module.exports = {
    // ** 多页模式 **
    // ** 200811 本地通过 file:// 加载单页成功 **
    // ** 200811 本地通过 file:// 加载多页不成功, 暂时不使用 **
    pages: getPages(),

    // ** 导入的scss公共变量 **
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/common/sj-ui.scss";`,
            },
        },
    },

    // ** 反向代理 **
    // devServer: {
    //     proxy: {
    //         '/toProxy': {
    //             target: 'http://192.168.1.111:62473',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/toProxy': '',
    //             },
    //         },
    //     },
    // },

    // github page
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}
