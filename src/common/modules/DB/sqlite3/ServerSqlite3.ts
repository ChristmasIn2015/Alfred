import { DBServable, TableCaller } from '../Type'

export default class ServerSqlite3 implements DBServable {
    DBAddress: string = ''
    DBOrigin: TableCaller = null

    constructor(dbAddress: string) {
        this.DBAddress = dbAddress
    }

    // 这里使用 sqlite3 文件式数据库
    start(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const sqlite3 = require('sqlite3').verbose()
            this.DBOrigin = new sqlite3.Database(this.DBAddress, (error) => (error ? reject(error) : resolve(true)))
        })
    }

    getTableCaller(TableName: string): Promise<TableCaller> {
        return Promise.resolve(this.DBOrigin)
    }
}
