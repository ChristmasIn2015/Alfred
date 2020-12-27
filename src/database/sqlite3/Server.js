export default class Server {
    dbName = ''
    dbServer = null

    constructor(dbName = 'NoNameDataBase') {
        this.dbName = dbName
    }

    // 链接数据库
    start() {
        return new Promise((resolve, reject) => {
            const sqlite3 = require('sqlite3').verbose()
            this.dbServer = new sqlite3.Database(`./data/${dbName}.db`, null, (error) => (error ? reject(error) : resolve(true)))
        })
    }

    // 关闭当前这个Sqlite3服务实例
    destory() {
        if (!this.dbServer) return
        this.dbServer.close()
    }

    // 获取/创建指定数据表
    getTable(tableName) {
        return new Promise((resolve, reject) => {})
    }
}
