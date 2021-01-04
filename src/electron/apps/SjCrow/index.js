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
async function start() {
    try {
        // 1.把数据库操作员绑定到主进程的 $db 上
        if (!global['$db']) global['$db'] = {}
        $db['server'] = new Server('SjCrow', require('path').join(process.cwd(), './src/electron/apps/SjCrow/SjCrow.db'))
        await $db.server.start()
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

        // 2.把业务调度员绑定到主进程的 $hyBridge 上
        if (!global['$hyBridge']) global['$hyBridge'] = {}
        _ipcBind('Native', Native)
        _ipcBind('Note', Note)

        // End
    } catch (error) {
        let message = typeof error === 'string' ? error : error.message
        console.log(`\x1B[41m\x1B[30m Ipc load Error: ${message} \x1B[0m`)
        process.exit()
    }
}
start()
// 把调度员的方法全部注册进IPC
function _ipcBind(TargetClassName, TargetClass) {
    const ipcMain = require('electron').ipcMain
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
