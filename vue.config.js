function getConfig() {
    const isElectron = process.argv[3] === 'electron'
    let list = []
    require('glob')
        .sync('./src/web/apps/*/*.js')
        .forEach((filePath) => {
            let entry = {
                name: filePath.split('/').reverse()[1],
                filePath,
            }
            if (isElectron) {
                entry.name.indexOf('_') === 0 ? list.push(entry) : ''
            } else {
                entry.name.indexOf('_') !== 0 ? list.push(entry) : ''
            }
        })
    //
    // let output = isElectron ? './src/electron/html' : './src/web/dist'
    let output = './src/web/dist'
    let pages = {}
    list.forEach((entry) => {
        pages[entry.name] = {
            entry: entry.filePath, // Webpack 打包入口
            template: `src/public/index.html`, // Html-webpack-plugin 插件的模板来源
            filename: `${entry.name}.html`, // 在 dist/index.html 的输出
            chunks: ['chunk-vendors', 'chunk-common', entry.name], // 提取出来的通用 chunk 和 vendor chunk。
        }
    })
    return {
        output,
        pages,
    }
}
const config = getConfig()
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: config.output,
    pages: config.pages,
}
