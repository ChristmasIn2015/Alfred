/*
    1.默认入口 : publicPath
    2.输出口 : outputDir
*/

module.exports = {
    publicPath:'/',
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
        }
    },
    devServer: {
        proxy: 'http://localhost:4000'
    }
}