import Response from '../../../../database/Response.js'
import ws from 'nodejs-websocket'

export default class WebSocket {
    server = null
    cmds = {}
    constructor() {
        this.server = ws.createServer((connection) => this.#salute(connection)).listen(6999)
    }

    // 每次客户端链接的回调
    #salute(connection) {
        // 接受到客户端发送的消息
        connection.on('text', (json) => {
            if (typeof json !== 'string') return
            let order = JSON.parse(order)
            this.#handle(connection, order)
        })
        // 链接异常
        connection.on('error', (code) => global.Cabin.createAlfredLog(`WebSocket Error close: ${code}`))
    }

    // 根据
    #handle(connection, order) {
        switch (order.type) {
            case 'CMD':
                {
                    const sub_process = require('child_process').exec(
                        order.cmd.replace(/\n/g, ' '),
                        { maxBuffer: 1024 * 1024 * 1024, encoding: 'binary' }, // Binary To UTF-8
                        (error, stdout, stderr) => {
                            // let time = new Date().toLocaleString('chinese', { hour12: false })
                            // let result = { index: params.index, message: '', pid: sub_process.pid }
                            // if (error) {
                            //     error.message = iconv.decode(Buffer.from(error.message, 'binary'), 'cp936') // Binary To UTF-8
                            //     result.message = `<span style="color:red">进程异常↓↓↓</span><br>`
                            //     result.message += `${error.message}<br>`
                            //     result.message += `<span style="color:red">${time} @进程异常↑↑↑</span>`
                            // } else if (stderr) {
                            //     result.message = `<span style="color:yellow">${time} @目标程序异常</span>`
                            // } else {
                            //     result.message = `<span style="color:green">${time} @进程任务结束!</span>`
                            // }
                            //
                            // result.pid = false
                            // connection.sendText(message)
                        }
                    )

                    // 1.2 监听/报告子进程日志
                    // sub_process.stdout.setEncoding('utf-8')
                    sub_process.stdout.on('data', (message) => {
                        message = iconv.decode(Buffer.from(message, 'binary'), 'cp936') // Binary To UTF-8
                        // connection.sendText(message)
                        // event.reply('excuteLocalCmd', { index: params.index, message: `<span style="color:green">Log: </span>${message}`, pid: sub_process.pid })
                        if (message.includes('Merge conflict in')) processKill(sub_process.pid)
                    })
                }
                break
            case '...':
                break
        }
    }
}
