// 这个脚本会在Electron主进程中加载
// 用于Electron主进程绑定渲染进程监听事件

// 打开Chromium控制台
const ipcMain = require('electron').ipcMain
ipcMain.on('openDevTool', (event, arg) => {
    event.sender.openDevTools()
})

// 渲染进程执行 $electron.ipcRenderer.send(name, params)
