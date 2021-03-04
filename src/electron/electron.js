//
const axios = require('axios')
function yjyLog(...message) {
    axios({
        method: 'POST',
        url: 'http://wqao.top/yjy-log/create',
        data: { message },
        headers: {},
    })
}
//
const PATH = require('path')
const SQUIRREL = require('./build/squirrel.js')
const AppPre = PATH.join(__dirname, `./electron-preload.js`)
const AppSDK = PATH.join(__dirname, `./apps/Solomon/main.js`)
try {
    // 1.渲染进程API
    global['$electron'] = require('electron')
    const { app, BrowserWindow, Menu } = global['$electron']

    // 2.检测更新
    if (app.isPackaged) {
        // 安装时主动抛出异常
        const isStartUp = require('electron-squirrel-startup')
        if (isStartUp) throw new Error('electron isStartUp')
        // 更新时主动抛出异常
        if (SQUIRREL.handleSquirrelEvent(yjyLog) !== false) throw new Error('electron is updating')
        // 开始检测更新
        require('update-electron-app')({ logger: { log: yjyLog } }) // 开发时
        // require('update-electron-app')() // 上线后
    }

    // 2.APP启动
    require(AppSDK)
    app.on('ready', () => {
        // 实例化窗口
        let MAIN_WINDOW = new BrowserWindow({
            width: 1360,
            height: 900,
            // resizable: false,
            webPreferences: {
                // nodeIntegration: true, // 为了让Vue app在浏览器内核中能够使用到Electron的API
                preload: AppPre, // 渲染进程预加载
            },
        })
        MAIN_WINDOW.openDevTools()
        MAIN_WINDOW.loadURL(`http://wqao.top/alfred/#/`)
        // MAIN_WINDOW.loadURL(`http://10.52.2.35:8080/#/`)

        // 关闭顶部窗口
        Menu.setApplicationMenu(null)
    })
    app.on('window-all-closed', () => {
        if (process.platform === 'darwin') {
            // app.quit()
        } else {
            app.quit()
        }
    })
} catch (error) {
    let message = typeof error === 'string' ? error : error.message
    yjyLog('electron.js error: ', message)
}
