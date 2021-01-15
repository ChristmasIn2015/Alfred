export default class Server {
    dbAddress = ''
    dbServer = null

    constructor(dbAddress) {
        this.dbAddress = dbAddress
    }

    // 链接数据库
    start() {
        return new Promise((resolve, reject) => {
            const sqlite3 = require('sqlite3').verbose()
            this.dbServer = new sqlite3.Database(this.dbAddress, (error) => (error ? reject(error) : resolve(true)))
        })
    }
}
