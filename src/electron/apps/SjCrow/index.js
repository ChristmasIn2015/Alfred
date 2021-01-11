/** **************************************************************
 * 这个脚本会在Electron主进程中加载
 * ***************************************************************
 * Web应该始终通过IPC通信来调用OS-API
 * $electron.ipcRenderer.send(name, params)
 * require('electron').ipcMain.on(name, (event, params)=>{})
 * ***************************************************************/
import Server from '../../../database/sqlite3/Server.js'
import Operator from '../../../database/sqlite3/Operator.js'
//
import Native from './IPC/Native.js'
import Note from './IPC/Note.js'
import Bats from './IPC/Bats.js'
async function start() {
    try {
        // 1.把数据库操作员绑定到主进程的 $db 上
        if (!global['$db']) global['$db'] = {}
        $db['server'] = new Server('SjCrow', require('path').join(process.cwd(), './src/electron/apps/SjCrow/SjCrow.db'))
        await $db.server.start()

        // 1.1 笔记业务需要的数据库
        const LIST_NOTE = [
            { name: 'Area', struct: { id: 'number', name: 'string' } },
            { name: 'Shelf', struct: { id: 'number', name: 'string' } },
            { name: 'Book', struct: { id: 'number', name: 'string', content: 'string' } },
            { name: 'Relation_AreaShelf', struct: { id: 'number', areaId: 'number', shelfId: 'number' } },
            { name: 'Relation_ShelfBook', struct: { id: 'number', shelfId: 'number', bookId: 'number' } },
        ]
        for (let index in LIST_NOTE) {
            let TableName = LIST_NOTE[index].name
            $db[TableName] = new Operator($db.server.db)
            await $db[TableName].init(TableName, LIST_NOTE[index].struct)
        }
        // 1.2 脚本业务需要的数据库
        const LIST_BATS = [{ name: 'Bats', struct: { id: 'number', name: 'string', path: 'string' } }]
        for (let index in LIST_BATS) {
            let TableName = LIST_BATS[index].name
            $db[TableName] = new Operator($db.server.db)
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
start()

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
function _ipcActive() {
    // * 执行脚本 主动报告脚本执行情况 params: { index, kill, path }
    const exec = require('child_process').exec
    if (!global.$childProcess) global['$childProcess'] = {}
    ipcMain.on('excuteCMD', (event, params) => {
        //
        // 1.0 结束子进程
        const pid = params.kill
        if (pid && global.$childProcess && global.$childProcess[pid]) {
            console.log('pid', pid, global.$childProcess[pid].killed)
            global.$childProcess[pid].kill()
            console.log('kill end', pid, global.$childProcess[pid].killed)
            return
        }
        //
        // 1.1 创建子进程
        event.reply('excuteCMD', {
            index: params.index,
            message: `<span style="color:green">${new Date().toLocaleString('chinese', { hour12: false })} @任务开始</span>`,
            pid: '...',
        })
        let child = exec(params.path.replace(/\n/g, ' '), { maxBuffer: 1024 * 1024 * 1024 }, (error, stdout, stderr) => {
            // 1.3 子进程执行CMD结束
            let time = new Date().toLocaleString('chinese', { hour12: false })
            let result = { index: params.index, message: '', pid: child.pid }
            if (error) {
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
        })

        // 1.2 监听/报告子进程日志
        child.stdout.on('data', (message) => {
            event.reply('excuteCMD', { index: params.index, message: `<span style="color:green">Log: </span>${message}`, pid: child.pid })
            if (message.includes('Merge conflict in')) child.kill() // throw error
        })
        child.on('exit', (code, signal) => {
            console.log('child process exited with' + `code ${code} and signal ${signal}`)
        })

        // * 全局控制子进程

        global.$childProcess[child.pid] = child
    })
}
