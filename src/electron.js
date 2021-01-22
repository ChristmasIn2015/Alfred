const PATH = require('path')
function log(message) {
    require('axios').post('http://42.193.102.196:7001/yjy-log/create', {
        message: message,
    })
}

// 1
require(PATH.join(__dirname, `./electron/dist/Alfred.js`))
// require(PATH.join(__dirname, `./electron/dist/${process.argv[2]}.js`))
log({ Title: '1.Electron require(hybridge) success' })

// 1
const { app, BrowserWindow, Menu } = require('electron')
app.on('ready', () => {})
app.whenReady().then(() => {
    // 实例化窗口
    const MAIN_WINDOW = new BrowserWindow({
        width: 1560,
        height: 1000,
        // resizable: false,
        webPreferences: {
            // nodeIntegration: true, // 为了让Vue app在浏览器内核中能够使用到Electron的API
            preload: require('path').join(__dirname, `./electron/preload.js`), // 渲染进程预加载
        },
    })
    MAIN_WINDOW.loadURL(`http://42.193.102.196:7000/Alfred/#/`)
    // MAIN_WINDOW.openDevTools()
    MAIN_WINDOW.on('closed', () => log({ Title: '** Electron Render Process Closed' }))
    MAIN_WINDOW.webContents.on('render-process-gone', (event, detail) => log({ Title: '** Electron Render Process Crashed', detail }))
    log({ Title: '2.Electron new BrowserWindow loadURL success' })

    // 关闭顶部窗口
    Menu.setApplicationMenu(null)
})

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        // app.quit()
        log({ Title: '* Electron app window-all-closed by darwin success' })
    } else {
        log({ Title: '* Electron app window-all-closed by not darwin success' })
        app.quit()
    }
})
