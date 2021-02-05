import treeKill from 'tree-kill'
// 0.声明

// 1.创建进程
export function excuteCmd(cmd_command: string, connection) {
    // 终止敏感操作
    const isDanger =
        cmd_command
            .trim()
            .toUpperCase()
            .indexOf('SSH') >= 0
    if (isDanger) {
        connection.answer({
            message: _getHtmlLog([`@Node Cmd Error(Danger Cmd: ${cmd_command})`, _getTimeString()]),
            DTO: {
                pid: null,
            },
        })
        return
    }
    // 0 首次回应请求者
    connection.answer({
        message: _getHtmlLog([`@Node Cmd Start(${process.pid})`, _getTimeString()]),
        DTO: {
            pid: 'Loading',
        },
    })
    // 1 创建子进程
    const sub_process = require('child_process').exec(
        cmd_command.replace(/\n/g, ' '),
        { maxBuffer: 1024 * 1024 * 1024, encoding: 'binary' }, // **** To Binary
        (error, stdout, stderr) => {
            let time = _getTimeString()
            if (error) {
                // 1.1 回应请求者 此进程异常
                connection.answer({
                    message: _getHtmlLog([`@Node Cmd Error(${process.pid})`, time, error.message, `@Node Cmd Error(${process.pid}) `]),
                    DTO: {
                        pid: null,
                    },
                })
            } else if (stderr) {
                // 2.2 回应请求者 执行的程序抛出异常
                connection.answer({
                    message: _getHtmlLog([stderr.message, `@任务异常(${sub_process.pid})`, time]),
                    DTO: {
                        pid: null,
                    },
                })
            } else {
                // 1.3 回应请求者 执行的程序结束
                connection.answer({
                    message: _getHtmlLog([`@Node Cmd End(${process.pid})`, time]),
                    DTO: {
                        pid: null,
                    },
                })
            }
        }
    )

    // 2 回应请求者 程序打印日志
    connection.answer({
        message: _getHtmlLog([`@Log SubProcess(${sub_process.pid})`]),
        DTO: {
            pid: process.pid,
        },
    })
    sub_process.stdout.on('data', (message) => {
        connection.answer({
            message: _getHtmlLog([`@Log ${message}`]),
            DTO: {
                pid: process.pid,
            },
        })
        if (message.includes('Merge conflict in')) treeKill(sub_process.pid)
    })

    return sub_process.pid
}
function _getHtmlLog(messageList) {
    let html = ''
    messageList.forEach((e) => {
        // if (global.process) {
        //     html += `\n${e}\n \n`
        // } else {
        if (!e) return
        e = require('iconv-lite').decode(Buffer.from(e, 'binary'), 'cp936') // Binary To UTF-8
        if (e.indexOf('@Node Cmd Start') >= 0) e = `<span style="color:green">\n${e}\n</sapn>`
        if (e.indexOf('@Node Cmd End') >= 0) e = `<span style="color:green">\n${e}\n</sapn>`
        if (e.indexOf('@任务异常') >= 0) e = `<span style="color:yellow">\n${e}\n</sapn>`
        if (e.indexOf('@Node Cmd Error') >= 0) e = `<span style="color:red">\n${e}\n</sapn>`
        if (e.indexOf('@Log') >= 0) e = `<span style="color:white">\n${e}\n</sapn>`
        html += `\n${e}\n<br>\n`
        // }
    })
    return html
}
function _getTimeString() {
    return new Date().toLocaleString('chinese', { hour12: false })
}

// 2.销毁进程
export function processDestory(processId: number) {
    if (typeof processId === 'number') treeKill(processId)
}
