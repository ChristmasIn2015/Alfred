const { app, ipcMain, BrowserWindow, Menu } = require('electron')

// Node 打开Chromium控制台
ipcMain.on('openDevTool', (event, arg) => {
    try {
        // return new Promise((resolve, reject) => {
        console.log(arg)
        event.sender.openDevTools()
        // resolve(true)
        // })
    } catch (error) {
        console.log(error.message)
    }
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
app.on('ready', () => {
    // 0 实例化窗口
    global.SanJi = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // 为了让Vue app在浏览器内核中能够使用到Electron的API
            preload: require('path').join(__dirname, '../utils/render.js'), // existsSync is not a function
        },
    })
    let instance = global.SanJi

    // 1 关闭顶部窗口
    Menu.setApplicationMenu(null)

    // 2 加载SPA
    instance.loadURL(`file://${process.cwd()}/src/web/dist/_note.html`)
    instance.openDevTools()
    instance.on('closed', () => (global.SanJi = null))
})
