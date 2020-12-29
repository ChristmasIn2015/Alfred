// 1
const appName = process.argv[2]

// 2
const hybridge = require('path').join(__dirname, `./dist/${appName}.js`)
require(hybridge)

// 3
const { app, BrowserWindow, Menu } = require('electron')
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
app.on('ready', () => {
    // 0 实例化窗口
    let instance = new BrowserWindow({
        width: 1360,
        height: 768,
        // resizable: false,
        webPreferences: {
            nodeIntegration: true, // 为了让Vue app在浏览器内核中能够使用到Electron的API
            preload: require('path').join(__dirname, `preload.js`), // 渲染进程预加载
        },
    })

    // 1 关闭顶部窗口
    Menu.setApplicationMenu(null)

    // 2 加载SPA
    // instance.loadURL(`file://${process.cwd()}/src/web/dist/${appName}.html`)
    instance.loadURL(`http://localHost:8080/${appName}/#/`)
    instance.openDevTools()
    instance.on('closed', () => (global.SanJi = null))
})
