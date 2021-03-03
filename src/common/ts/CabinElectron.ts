import ServerSqlite3 from '../modules/DB/sqlite3/ServerSqlite3'
import OperatorSqlite3 from '../modules/DB/sqlite3/OperatorSqlite3'
export default class CabinElectron implements ClassBindable {
    //
    BinderMap: Map<string, object> = new Map() // ClassBindable
    //
    cabinDB = null
    cabinHandler = null // 暂时没用到
    //
    constructor() {}

    // 数据库
    // 数据库
    // 数据库
    // 数据库
    // 数据库：和本地数据库服务进行链接
    async dbLink(DBAddress: string): Promise<any> {
        // mongodb://127.0.0.1:27017/dbName
        this.cabinDB = new ServerSqlite3(DBAddress)
        await this.cabinDB.start()
    }
    // 数据库：创建表 及其操作员
    async dbTabler(tablerList: DBTabler[]): Promise<any> {
        if (!global['$db']) global['$db'] = {}
        if (!this.cabinDB) throw new Error('数据库服务不存在')
        //
        for (let i in tablerList) {
            const OperatorName = tablerList[i].name
            const TablePointer = await this.cabinDB.getTableCaller(OperatorName)
            global['$db'][OperatorName] = new OperatorSqlite3(TablePointer)
            await global['$db'][OperatorName].init(OperatorName, tablerList[i].struct)
        }
    }

    // Electron
    // Electron
    // Electron
    // Electron
    // ***************************************************************************************
    // 注意由于 require('electron') 和 TypeScript 的冲突
    // 这里在 electron.js 中已经手动在 global 上挂载了 global['$electron'] = require('electron')
    // Cabin.electronRoute 使用的是 global['$electron']
    // ***************************************************************************************
    // Electron：数据接口分配
    electronRoute(route: string, next: (...args) => any) {
        global['$electron'].ipcMain.handle(route, (...args) => next(...args))
    }
    // Electron：长链接分配
    electronAliveRoute(route: string, next: (...args) => any) {
        global['$electron'].ipcMain.on(route, (...args) => next(...args))
    }
}
