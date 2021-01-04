import Response from '../utils/Response.js'
// 这个类提供Node操纵OS的一些方法
export default class Native {
    constructor() {}

    // 打开Chromium控制台
    @Response('打开控制台成功')
    openDevTool(event, params) {
        return new Promise((resolve, reject) => {
            event.sender.openDevTools()
            resolve(true)
        })
    }

    // 打开系统默认浏览器
    @Response('打开系统默认浏览器成功')
    openBrower(event, params) {
        return new Promise((resolve, reject) => {
            const exec = require('child_process').exec
            switch (process.platform) {
                case 'darwin':
                    exec('open ' + arg.url)
                    break
                case 'win32':
                    exec('start ' + arg.url)
                    break
            }
            resolve(true)
        })
    }
}
