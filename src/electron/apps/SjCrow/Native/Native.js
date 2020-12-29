// 这个类提供Node操纵OS的一些方法
export default class Native {
    constructor() {}

    // 打开Chromium控制台
    openDevTool(event, params) {
        event.sender.openDevTools()
    }

    // 打开系统默认浏览器
    openBrower(event, params) {
        const exec = require('child_process').exec
        switch (process.platform) {
            case 'darwin':
                exec('open ' + arg.url)
                break
            case 'win32':
                exec('start ' + arg.url)
                break
        }
    }
}
