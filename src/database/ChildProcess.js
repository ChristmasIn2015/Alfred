/** *******************************************************************
 * Node创建子进程方法
 * *******************************************************************
 * 1.child_process.exec(command, options, callback)
 * 创建一个shell，然后在shell里执行命令。
 * 执行完成后，将stdout、stderr作为参数传入回调方法。
 * *******************************************************************
 * 2.child_process.execFile(command, options, callback)
 * 直接执行可执行文件, 没有创建一个新的shell
 * 一些操作，比如I/O重定向，文件glob等不支持。
 * *******************************************************************
 * 3.child_process.fork(modulePath, args, options)
 * 4.child_process.spawn(command, args, options)
 * *******************************************************************
 * 以上四种方法返回一个ChildProcess代表衍生的子进程
 * *******************************************************************
 * 参考文章:
 * https://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html
 * https://zhuanlan.zhihu.com/p/36678971
 * ******************************************************************* */
// 1.创建进程
function processExcuteCmd(cmdString, connection) {
    // 0 首次回应请求者
    connection.answer({
        message: _getHtmlLog([`${new Date().toLocaleString('chinese', { hour12: false })} @任务开始`]),
        DTO: {
            pid: 'Loading',
        },
    })
    // 1 创建子进程
    const sub_process = require('child_process').exec(
        cmdString.replace(/\n/g, ' '),
        { maxBuffer: 1024 * 1024 * 1024, encoding: 'binary' }, // **** To Binary
        (error, stdout, stderr) => {
            let time = new Date().toLocaleString('chinese', { hour12: false })
            if (error) {
                // 1.1 回应请求者 此进程异常
                // error.message = require('iconv-lite').decode(Buffer.from(error.message, 'binary'), 'cp936') // Binary To UTF-8
                connection.answer({
                    message: _getHtmlLog([`@进程异常`, error.message, `${time} @进程异常`]),
                    DTO: {
                        pid: null,
                    },
                })
            } else if (stderr) {
                // 2.2 回应请求者 执行的程序抛出异常
                // stderr.message = require('iconv-lite').decode(Buffer.from(stderr.message, 'binary'), 'cp936') // Binary To UTF-8
                connection.answer({
                    message: _getHtmlLog([stderr.message, `${time} @目标程序异常`]),
                    DTO: {
                        pid: null,
                    },
                })
            } else {
                // 1.3 回应请求者 执行的程序结束
                connection.answer({
                    message: _getHtmlLog([`${time} @进程任务结束`]),
                    DTO: {
                        pid: null,
                    },
                })
            }
        }
    )

    // 2 回应请求者 程序打印日志
    sub_process.stdout.on('data', (message) => {
        message = require('iconv-lite').decode(Buffer.from(message, 'binary'), 'cp936') // Binary To UTF-8
        connection.answer({
            message: _getHtmlLog([`@Log: ${message}`]),
            DTO: {
                pid: sub_process.pid,
            },
        })
        if (message.includes('Merge conflict in')) require('tree-kill')(sub_process.pid)
    })
}
function _getHtmlLog(messageList) {
    let html = ''
    messageList.forEach((e) => {
        // if (global.process) {
        //     html += `${e} \n`
        // } else {
        // e = require('iconv-lite').decode(Buffer.from(e, 'binary'), 'cp936') // Binary To UTF-8
        if (!e) return
        if (e.indexOf('@任务开始') >= 0 || e.indexOf('@进程任务结束!') >= 0) e = `<span style="color:green">${e}</sapn>`
        if (e.indexOf('@目标程序异常') >= 0) e = `<span style="color:yellow">${e}</sapn>`
        if (e.indexOf('@进程异常') >= 0) e = `<span style="color:red">${e}</sapn>`
        html += `${e}<br>`
        // }
    })
    return html
}

// 2.销毁进程
function processDestory(processId) {
    if (typeof processId === 'number') require('tree-kill')(processId)
}
module.exports = { processExcuteCmd, processDestory }
