const { BrowserWindow, Menu } = require('electron')
function initWindow() {
    // 0 实例化窗口
    global.SanJi = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // 为了让Vue app在浏览器内核中能够使用到Electron的API
        },
    })
    let instance = global.SanJi

    // 1 关闭顶部窗口
    Menu.setApplicationMenu(null)

    // 2 加载SPA
    const webPath = require('path').join(__dirname.replace('electron\\utils', ''), '\\web\\dist\\_note.html') // npm
    let url = require('url').format({
        protocol: 'file',
        slashes: true,
        pathname: webPath,
    })
    instance.loadURL(url)
    instance.openDevTools()
    instance.on('closed', () => (global.SanJi = null))
}
module.exports = {
    initWindow,
}
