import { MongoClient, MongoError } from 'mongodb'

export default class ServerMongo implements DBServable {
    DBAddress: string = ''
    DBOrigin: any = null

    constructor(DBAddress: string) {
        this.DBAddress = DBAddress
    }

    // npm install mongodb@3.6.0
    // 这里使用官方 node-mongodb-native 来操纵 MongoDB 数据库
    start(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.DBAddress, { useUnifiedTopology: true }, (error: MongoError, client: MongoClient) => {
                if (error) {
                    reject(error)
                } else {
                    this.DBOrigin = client.db(this.DBAddress.split('/').reverse()[0])
                    resolve(true)
                }
            })
        })
    }

    // 获取/创建指定数据集合
    getTableCaller(TableName: string): Promise<object> {
        return new Promise((resolve, reject) => {
            this.DBOrigin.collection(TableName, { strict: true }, (error1, collection) => {
                if (error1) {
                    if (error1.message === `Collection ${TableName} does not exist. Currently in strict mode.`) {
                        // * 集合不存在, 就创建这个集合
                        this.DBOrigin.createCollection(TableName, {}, (error2, collectionNew) => {
                            if (error2) {
                                reject(`创建集合${TableName}失败: ${error2.message}`)
                                return
                            }
                            resolve(collectionNew)
                        })
                    } else {
                        // * 获取集合报错
                        reject(error1)
                    }
                } else {
                    resolve(collection)
                }
            })
        })
    }
}
