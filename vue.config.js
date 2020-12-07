function getPages() {
    let viewsMap = {}
    let list = []
    require('glob')
        .sync('./src/web/apps/*/*.js')
        .forEach((filePath) => {
            let entry = {
                name: filePath.split('/').reverse()[1],
                filePath,
            }
            if (process.argv[3] === 'electron') {
                entry.name.indexOf('_') === 0 ? list.push(entry) : ''
            } else {
                entry.name.indexOf('_') !== 0 ? list.push(entry) : ''
            }
        })
    //
    list.forEach((entry) => {
        viewsMap[entry.name] = {
            entry: entry.filePath, // Webpack 打包入口
            template: `src/public/index.html`, // Html-webpack-plugin 插件的模板来源
            filename: `${entry.name}.html`, // 在 dist/index.html 的输出
            chunks: ['chunk-vendors', 'chunk-common', entry.name], // 提取出来的通用 chunk 和 vendor chunk。
        }
    })
    return viewsMap
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: './src/web/dist',
    pages: getPages(),
}
