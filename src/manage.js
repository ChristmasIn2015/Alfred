const print = require('./print.js')
/** *******************************************************************
 * 1.构建web应用
 *      npm run dev web SjShop
 * 2.构建node应用
 *      npm run dev node SjShop
 * 3.构建electron应用
 *      npm run dev electron SjShop
 * ******************************************************************* */
const appType = process.argv[2]
if (appType !== 'web' && appType !== 'node' && appType !== 'electron') {
    print.text(`请输入正确的应用类型 npm run dev (${appType}) (name) \n`)
    process.exit()
}
let appName = null
let list = require('glob').sync(`./src/${appType}/apps/*/*.js`)
list.forEach((path) => (path.split('/').reverse()[1] === process.argv[3] ? (appName = process.argv[3]) : ''))
if (!appName) {
    print.text(`找不到应用 npm run dev ${appType} (${process.argv[3]}) \n`)
    process.exit()
}
/** *******************************************************************
 * 根据命令行输入确定CMD命令
 * 并使用子进程来执行CMD命令
 * ******************************************************************* */
let cmd = ''
switch (appType) {
    case 'web': {
        // 使用@vue/cli启动一个单页应用
        let target = require('path').join(__dirname, `./web/apps/${appName}/main.js`)
        cmd += `vue-cli-service serve ${target}`
        break
    }
    case 'node': {
        // 打包Express应用的高语法JS文件
        // 执行这个JS文件
        let target = require('path').join(__dirname, `./node/dist/${appName}.js`)
        cmd += `webpack --config ./src/node/webpack.config.js`
        cmd += `&& node ${target} ${process.argv[4] || 7000}`
        break
    }
    case 'electron': {
        // 使用@vue/cli打包一个单页应用
        let target = require('path').join(__dirname, `./web/apps/${appName}/main.js`)
        // 打包Electron应用的高语法JS文件
        // 启动每次唯一的Electron应用
        // cmd += `vue-cli-service build ${target}`
        cmd += `webpack --config ./src/electron/webpack.config.js `
        cmd += `&& electron ./src/electron/electron.js ${appName}`
        break
    }
}
require('./database/ChildProcess.js').excuteCmd(cmd, {
    answer: (answer) => {
        console.log(answer.message)
    },
})
