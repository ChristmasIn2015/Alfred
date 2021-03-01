import '../ts/common-node'
/** *******************************************************************
 * 1.构建web应用
 *      npm run dev web SjShop
 * 2.构建node应用
 *      npm run dev node SjShop
 * 3.构建electron应用
 *      npm run dev electron SjShop
 * ******************************************************************* */
const appMap = {
    web: true,
    node: true,
    electron: true,
}
const appType = process.argv[2]
if (!appMap[appType]) {
    global['$common'].printText(`请输入正确的应用类型 npm run dev (${appType}) (name) \n`)
    process.exit()
}
let appName = null
let list = require('glob').sync(`./src/${appType}/apps/*/*.js`)
list.forEach((path) => (path.split('/').reverse()[1] === process.argv[3] ? (appName = process.argv[3]) : ''))
if (!appName) {
    global['$common'].printText(`找不到应用 npm run dev ${appType} (${process.argv[3]}) \n`)
    process.exit()
}
/** *******************************************************************
 * 根据命令行输入确定CMD命令
 * 并使用子进程来执行CMD命令
 * ******************************************************************* */
const PATH = require('path')
let cmd = ''
switch (appType) {
    case 'web': {
        // 使用@vue/cli启动一个单页应用
        let target = PATH.join(process.cwd(), `./src/web/apps/${appName}/main.js`)
        console.log(target)
        cmd += `vue-cli-service serve ${target}`
        break
    }
    case 'node': {
        // 执行这个JS文件
        let target = PATH.join(process.cwd(), `./src/node/apps/${appName}/main.js`)
        cmd += `node ./src/node/esbuild.config.js`
        cmd += ` && node ${target} ${process.argv[4]}`
        break
    }
    //     case 'electron': {
    //         // 使用@vue/cli打包一个单页应用
    //         // cmd += `vue-cli-service build ${PATH.join(__dirname, `./web/apps/${appName}/main.js`)}`
    //         // 打包Electron应用的高语法JS文件
    //         cmd += `webpack --config ./src/electron/webpack.config.js `
    //         // 启动每次唯一的Electron应用
    //         cmd += `&& electron ./src/electron/electron.js ${appName}`
    //         break
    //     }
}
import { excuteCmd } from './cmd'
if (cmd)
    excuteCmd(cmd, (answer: CmdAnswer) => {
        if (answer.text.indexOf('[HPM] Client disconnected') > -1) return
        if (answer.text.indexOf('[HPM] Upgrading to WebSocket') > -1) return
        console.log(answer.text)
    })
