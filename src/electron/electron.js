const PATH = require('path')

// 1
// require('update-electron-app')() // 热更新
require(PATH.join(__dirname, `./dist/Alfred.js`))
var package = require(PATH.join(__dirname, '../../package.json'))
console.log(package)
// require(PATH.join(__dirname, `./electron/dist/${process.argv[2]}.js`))
// 210122 Electron 使用 electron-packager 打包成功，依赖 @babel/polyfill

// 1
const { app, BrowserWindow, Menu } = require('electron')
app.on('ready', () => {
    // 实例化窗口
    let MAIN_WINDOW = new BrowserWindow({
        width: 1360,
        height: 900,
        // resizable: false,
        webPreferences: {
            // nodeIntegration: true, // 为了让Vue app在浏览器内核中能够使用到Electron的API
            preload: require('path').join(__dirname, `./preload.js`), // 渲染进程预加载
        },
    })
    MAIN_WINDOW.openDevTools()
    // MAIN_WINDOW.loadFile(`${PATH.join(__dirname, '../web/dist/Alfred.html')}`)
    MAIN_WINDOW.loadURL(`http://42.193.102.196:7000/Alfred/#/`)

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
