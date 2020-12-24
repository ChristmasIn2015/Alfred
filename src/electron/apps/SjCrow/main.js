/** *******************************************************************
 * 
 * npm config edit : electron_mirror=https://npm.taobao.org/mirrors/electron/
 * SjCrow 
 * 是一个 Electron 应用，内嵌了一个 SPA 应用
 * SPA 各个模块通过IPC通信可以调用 Node API
 * 
 * *******************************************************************
 * 
 > Admin 模块, 是一个欢迎页面, 可以在右侧切换路由
 * Cmd 模块, 是脚本列表, 可以执行终止自定义脚本 in LowDB
 * Note 模块, 是笔记系统 in LowDB
 * 待规划 Stock 模块, 是股票系统 in LowDB
 * 待规划 Jira 模块, 是流程管理工具 in LowDB
 * 
 * ******************************************************************* */

const { app, BrowserWindow, Menu } = require('electron')
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
app.on('ready', () => {
    // 0 实例化窗口
    let instance = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // 为了让Vue app在浏览器内核中能够使用到Electron的API
            preload: require('path').join(__dirname, '../../utils/preload.js'), // existsSync is not a function
        },
    })

    // 1 关闭顶部窗口
    Menu.setApplicationMenu(null)

    // 2 加载SPA
    instance.loadURL(`file://${process.cwd()}/src/web/dist/_SjCrow.html`)
    instance.openDevTools()
    instance.on('closed', () => (global.SanJi = null))
})
require('../../utils/ipc.js')
