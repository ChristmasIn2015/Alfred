const singleApps = ['SjCrow'] // 希望的应用名称;
const electronApps = ['SjCrow'] // 默认的Electron内嵌Web名称
const isElectron = process.argv[3] === 'electron'
const apps = require('glob').sync('./src/web/apps/*/*.js')

let pages = {}
for (const key in apps) {
    const path = apps[key]
    const name = path.split('/').reverse()[1]

    let targets = isElectron ? electronApps : singleApps
    targets.forEach((singleAppName) => {
        if (singleAppName === name) {
            console.log(`\x1B[42m\x1B[30m 即将构建 ${name} \x1B[0m`)
            console.log()
            pages[name] = {
                entry: path, // Webpack 打包入口
                template: `src/public/index.html`, // Html-webpack-plugin 插件的模板来源
                filename: `${name}.html`, // 在 dist/index.html 的输出
                chunks: ['chunk-vendors', 'chunk-common', name], // 提取出来的通用 chunk 和 vendor chunk。
            }
        }
    })
}
if (Object.keys(pages).length === 0) {
    console.log(`\x1B[41m\x1B[30m 未找到应用 ${isElectron ? electronApps : singleApps} \x1B[0m`)
    console.log()
    process.exit()
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: './src/web/dist',
    pages,
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/web/styles/color/black-purple.scss";`,
            },
        },
    },
}
