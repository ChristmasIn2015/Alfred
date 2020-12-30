export default class Server {
    dbName = ''
    dbPath = ''
    db = null

    constructor(dbName = 'NoNameDataBase', dbPath) {
        this.dbName = dbName
        this.dbPath = dbPath
    }

    // 链接数据库
    start() {
        return new Promise((resolve, reject) => {
            const sqlite3 = require('sqlite3').verbose()
            this.db = new sqlite3.Database(this.dbPath, (error) => (error ? reject(error) : resolve(true)))
        })
    }

    // 关闭当前这个Sqlite3服务实例
    destory() {
        if (!this.db) return
        this.db.close()
    }
}
