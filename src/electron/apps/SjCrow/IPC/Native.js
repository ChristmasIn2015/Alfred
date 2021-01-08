import Response from '../utils/Response.js'
// 这个类提供Node操纵OS的一些方法
export default class Native {
    constructor() {}

    // 打开Chromium控制台
    @Response('打开控制台成功')
    async openDevTool(event, params) {
        event.sender.openDevTools()
        return true
    }

    // 打开系统默认浏览器
    @Response('打开系统默认浏览器成功')
    async openBrower(event, params) {
        const exec = require('child_process').exec
        switch (process.platform) {
            case 'darwin':
                exec('open ' + arg.url)
                break
            case 'win32':
                exec('start ' + arg.url)
                break
        }
        return true
    }
}
