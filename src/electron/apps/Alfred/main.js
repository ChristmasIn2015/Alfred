import Server from '../../../database/sqlite3/Server.js'
import Operator from '../../../database/sqlite3/Operator.js'
import processKill from 'tree-kill'
//
import Native from './IPC/Native.js'
import Note from './IPC/Note.js'
import Bats from './IPC/Bats.js'
//
async function go() {
    try {
        const DB_ADDRESS = require('path').join(process.cwd(), './src/electron/apps/Alfred/Alfred.db')

        // 1.链接Sqlite3数据库服务
        global['$server'] = new Server(DB_ADDRESS)
        await global['$server'].start()
        // 2.创建Sqlite3【数据库操作员】
        global['$db'] = {}
        const LIST_NOTE = [
            { name: 'Area', struct: { name: 'string' } },
            { name: 'Shelf', struct: { name: 'string' } },
            { name: 'Book', struct: { name: 'string', content: 'string' } },
            { name: 'Relation_AreaShelf', struct: { areaId: 'number', shelfId: 'number' } },
            { name: 'Relation_ShelfBook', struct: { shelfId: 'number', bookId: 'number' } },
        ]
        for (let index in LIST_NOTE) {
            let TableName = LIST_NOTE[index].name
            $db[TableName] = new Operator($server.dbServer)
            await $db[TableName].init(TableName, LIST_NOTE[index].struct)
        }
        // 1.2 脚本业务需要的数据库
        const LIST_BATS = [{ name: 'Bats', struct: { name: 'string', path: 'string' } }]
        for (let index in LIST_BATS) {
            let TableName = LIST_BATS[index].name
            $db[TableName] = new Operator($server.dbServer)
            await $db[TableName].init(TableName, LIST_BATS[index].struct)
        }

        // 2.把业务调度员绑定到主进程的 $hyBridge 上
        if (!global['$hyBridge']) global['$hyBridge'] = {}
        _ipcBind('Native', Native)
        _ipcBind('Note', Note)
        _ipcBind('Bats', Bats)

        // 3.把通用主动通信方法注册进IPC
        _ipcActive()

        // End
    } catch (error) {
        let message = typeof error === 'string' ? error : error.message
        console.log(`\x1B[41m\x1B[30m Ipc load Error: ${message} \x1B[0m`)
        process.exit()
    }
}
go()

// 把调度员的方法全部注册进IPC
const ipcMain = require('electron').ipcMain
function _ipcBind(TargetClassName, TargetClass) {
    $hyBridge[TargetClassName] = new TargetClass()
    if (TargetClass.prototype) {
        Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
            if (functionName === 'constructor') return // continue
            ipcMain.handle(functionName, async (...args) => {
                let origin = $hyBridge[TargetClassName]
                let result = await origin[functionName].apply(origin, args)
                return result
            })
        })
    }
}

// 把主动通信的方法注册进IPC
const iconv = require('iconv-lite')
function _ipcActive() {
    // * 执行脚本 主动报告脚本执行情况 params: { index, kill, path }
    ipcMain.on('excuteCMD', (event, params) => {
        //
        // 1.0 终止某个子进程
        const pid = params.kill
        if (pid) {
            processKill(pid)
            return
        }
        //
        // 1.1 创建子进程
        event.reply('excuteCMD', {
            index: params.index,
            message: `<span style="color:green">${new Date().toLocaleString('chinese', { hour12: false })} @任务开始</span>`,
            pid: '...',
        })
        const sub_process = require('child_process').exec(
            params.path.replace(/\n/g, ' '),
            { maxBuffer: 1024 * 1024 * 1024, encoding: 'binary' }, // Binary To UTF-8
            (error, stdout, stderr) => {
                // 1.3 子进程执行CMD结束
                let time = new Date().toLocaleString('chinese', { hour12: false })
                let result = { index: params.index, message: '', pid: sub_process.pid }
                if (error) {
                    error.message = iconv.decode(Buffer.from(error.message, 'binary'), 'cp936') // Binary To UTF-8
                    result.message = `<span style="color:red">进程异常↓↓↓</span><br>`
                    result.message += `${error.message}<br>`
                    result.message += `<span style="color:red">${time} @进程异常↑↑↑</span>`
                } else if (stderr) {
                    result.message = `<span style="color:yellow">${time} @目标程序异常</span>`
                } else {
                    result.message = `<span style="color:green">${time} @进程任务结束!</span>`
                }
                //
                result.pid = false
                event.reply('excuteCMD', result)
            }
        )

        // 1.2 监听/报告子进程日志
        // sub_process.stdout.setEncoding('utf-8')
        sub_process.stdout.on('data', (message) => {
            message = iconv.decode(Buffer.from(message, 'binary'), 'cp936') // Binary To UTF-8
            event.reply('excuteCMD', { index: params.index, message: `<span style="color:green">Log: </span>${message}`, pid: sub_process.pid })
            if (message.includes('Merge conflict in')) processKill(sub_process.pid)
        })
    })
}
