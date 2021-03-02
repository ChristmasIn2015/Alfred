const PATH = require('path')
const SQUIRREL = require('./build/squirrel.js')
const AppPre = PATH.join(__dirname, `./electron-preload.js`)
const AppSDK = PATH.join(__dirname, `./apps/Solomon/main.js`)
try {
    // 1.渲染进程API
    global['$electron'] = require('electron')
    const { app, BrowserWindow, Menu } = global['$electron']

    // 2.检测更新
    // if (app.isPackaged) {
    //     if (require('electron-squirrel-startup')) throw new Error('electron-squirrel-startup')
    //     if (SQUIRREL.handleSquirrelEvent() !== false) throw new Error('handleSquirrelEvent break')
    //     require('update-electron-app')()
    // }

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
        MAIN_WINDOW.loadURL(`http://10.52.2.35:8080`)
        // MAIN_WINDOW.loadURL(`http://wqao.top/solomon/#/`)

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
    SQUIRREL.yjyLog('electron.js error: ', message)
}
