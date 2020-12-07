import { MongoClient } from 'mongodb'
export default class Server {
    client = null
    dbName = ''
    dbAddress = ''
    dbServer = null

    constructor(dbAddress = 'mongodb://127.0.0.1:27017', dbName = 'NoNameDataBase') {
        this.dbName = dbName
        this.dbAddress = `${dbAddress}/${dbName}`
    }

    // npm install mongodb@3.6.0
    // 这里使用官方 node-mongodb-native 来操纵 MongoDB 数据库
    start() {
        return new Promise((resolve, reject) => {
            // console.log('(1/4) 正在连接本地Mongo服务', this.dbAddress)
            MongoClient.connect(this.dbAddress, { useUnifiedTopology: true }, (error, client) => {
                if (error) {
                    reject(error)
                } else {
                    // console.log('(2/4) 连接本地Mongo服务成功', this.dbAddress)
                    this.client = client
                    // console.log('(3/4) 正在连接数据库', this.dbName)
                    this.dbServer = client.db(this.dbName)
                    // console.log('(4/4) 连接数据库成功', this.dbName)
                    console.log()
                    resolve(true)
                }
            })
        })
    }
    // 关闭当前这个Mongo服务实例
    destory() {
        if (!this.client) return
        this.client.close()
    }
    // 获取/创建指定数据集合
    getCollection(collectionName) {
        return new Promise((resolve, reject) => {
            this.dbServer.collection(collectionName, { strict: true }, (error1, dbServerCollection1) => {
                if (error1) {
                    if (error1.message === `Collection ${collectionName} does not exist. Currently in strict mode.`) {
                        // * 集合不存在, 就创建这个集合
                        this.dbServer.createCollection(collectionName, {}, (error2, dbServerCollection2) => {
                            if (error2) {
                                reject(`创建集合${collectionName}失败: ${error2.message}`)
                                return
                            }
                            if (!dbServerCollection2) {
                                reject('获取集合失败')
                                return
                            }
                            resolve(dbServerCollection2)
                        })
                    } else {
                        // * 获取集合报错
                        reject(error1)
                    }
                } else {
                    if (!dbServerCollection1) {
                        reject('获取集合失败')
                        return
                    }
                    resolve(dbServerCollection1)
                }
            })
        })
    }
}
