import Server from '../../../database/sqlite3/Server.js'
import Operator from '../../../database/sqlite3/Operator.js'
import Cabin from '../../../database/Cabin.js'
//
import Native from './modules/Native.js'
import Note from './modules/Note.js'
import Cmds from './modules/Cmds.js'
import CmdsAuto from './modules/CmdsAuto.js'
//
async function go() {
    try {
        const DB_ADDRESS = require('path').join(process.cwd(), 'Alfred.db') // 打包的时候极其要注意这个路径问题
        // const DB_ADDRESS = require('path').join(process.cwd(), './src/electron/apps/Alfred/Alfred.db')

        // 1.链接Sqlite3数据库服务
        global['$server'] = new Server(DB_ADDRESS)
        await global['$server'].start()
        // 2.创建Alfred的【Sqlite3数据库操作员】
        global['$db'] = {}
        const OPERATORS = [
            // 书籍业务需要的数据库
            { name: 'Area', struct: { name: 'string' } },
            { name: 'Shelf', struct: { name: 'string' } },
            { name: 'Book', struct: { name: 'string', content: 'string' } },
            { name: 'Relation_AreaShelf', struct: { areaId: 'number', shelfId: 'number' } },
            { name: 'Relation_ShelfBook', struct: { shelfId: 'number', bookId: 'number' } },
            // 脚本业务需要的数据库
            { name: 'Cmds', struct: { name: 'string', cmdString: 'string' } },
            // ...
        ]
        for (let index in OPERATORS) {
            const name = OPERATORS[index].name
            const struct = OPERATORS[index].struct
            const TablePointer = $server.dbServer
            $db[name] = new Operator(TablePointer)
            await $db[name].init(name, struct)
        }

        // 3.初始化控制台/使其绑定【业务调度员】
        global['Cabin'] = null
        global['Cabin'] = new Cabin()
        global['Cabin'].bindIpcDispatcher('Native', Native)
        global['Cabin'].bindIpcDispatcher('Note', Note)
        global['Cabin'].bindIpcDispatcher('Cmds', Cmds)
        global['Cabin'].bindAutoIpcDispatcher('CmdsAuto', CmdsAuto)

        // End
    } catch (error) {
        let message = typeof error === 'string' ? error : error.message
        console.log(`\x1B[41m\x1B[30m Ipc load Error: ${message} \x1B[0m`)
        process.exit()
    }
}
go()
