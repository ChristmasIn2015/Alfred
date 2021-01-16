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
 * Node创建子进程方法
 * *******************************************************************
 * 1.child_process.exec(command, options, callback)
 * 创建一个shell，然后在shell里执行命令。
 * 执行完成后，将stdout、stderr作为参数传入回调方法。
 * *******************************************************************
 * 2.child_process.execFile(command, options, callback)
 * 直接执行可执行文件, 没有创建一个新的shell
 * 一些操作，比如I/O重定向，文件glob等不支持。
 * *******************************************************************
 * 3.child_process.fork(modulePath, args, options)
 * 4.child_process.spawn(command, args, options)
 * *******************************************************************
 * 以上四种方法返回一个ChildProcess代表衍生的子进程
 * *******************************************************************
 * 参考文章:
 * https://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html
 * https://zhuanlan.zhihu.com/p/36678971
 * ******************************************************************* */
const { exec } = require('child_process')
function executeAsync(cmd) {
    let child = exec(cmd, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            print.red('manage.js: 进程错误\n')
        } else if (stderr) {
            console.error(stderr)
            print.yellow('manage.js: 脚本异常\n')
        } else {
            print.green('manage.js: 进程结束\n')
        }
    })
    if (child && cmd) child.stdout.on('data', (data) => console.log(data))
    return { process: child, pid: child.pid }
}
/** *******************************************************************
 * 根据命令行输入确定CMD命令
 * 并使用子进程来执行CMD命令
 * ******************************************************************* */
if (!global.$child_process_map) global['$child_process_map'] = {}
let cmd = null
switch (appType) {
    case 'web': {
        // 使用@vue/cli启动一个单页应用
        let target = require('path').join(__dirname, `./web/apps/${appName}/main.js`)
        cmd = `vue-cli-service serve ${target}`
        // cmd = `vue-cli-service serve --open ${target}`
        break
    }
    case 'node': {
        // 打包Express应用的高语法JS文件
        // 执行这个JS文件
        let target = require('path').join(__dirname, `./node/dist/${appName}.js`)
        // cmd = `webpack --config ./src/node/webpack.config.js`
        cmd = `webpack --config ./src/node/webpack.config.js && node ${target} 7000`
        break
    }
    case 'electron': {
        // 使用@vue/cli打包一个单页应用
        let target = require('path').join(__dirname, `./web/apps/${appName}/main.js`)
        // 打包Electron应用的高语法JS文件
        // 启动每次唯一的Electron应用
        // cmd = `vue-cli-service build ${target}`
        cmd = `webpack --config ./src/electron/webpack.config.js && electron ./src/electron/electron.js ${appName}`
        // cmd = `vue-cli-service build ${target} && webpack --config ./src/electron/webpack.config.js && electron ./src/electron/electron.js ${appName}`
        break
    }
}
executeAsync(cmd)
