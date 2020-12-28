export default function ipcInit() {
    const ipcMain = require('electron').ipcMain

    // 打开Chromium控制台
    ipcMain.on('openDevTool', async (event, arg) => {
        let answer = false
        try {
            event.sender.openDevTools()
            answer = true
        } catch (error) {
            console.log(error.message)
        } finally {
            return answer
        }
    })

    // 打开OS默认浏览器
    ipcMain.on('openDefaultBrower', (event, arg) => {
        let answer = false
        try {
            const exec = require('child_process').exec
            switch (process.platform) {
                case 'darwin':
                    exec('open ' + arg.url)
                    break
                case 'win32':
                    exec('start ' + arg.url)
                    break
                default:
                    exec('xdg-open', [arg.url])
            }
            answer = true
        } catch (error) {
            console.log(error.message)
        } finally {
            return answer
        }
    })
}
