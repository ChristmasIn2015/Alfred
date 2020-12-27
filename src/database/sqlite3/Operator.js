import { ObjectId } from 'mongodb'

// * 这个类提供对 mongodb 数据库的CRUD原子操作
export default class Operator {
    collection = null
    constructor(collection) {
        this.collection = collection
    }
    // 创建
    create(doc) {
        return new Promise((resolve, reject) => {
            doc = Object.assign(doc, { _id: String(new ObjectId()), timeString: new Date().toLocaleString('chinese', { hour12: false }) })
            this.collection.insertOne(doc, { forceServerObjectId: true }, (error, result) => {
                error ? reject(error.message) : resolve(result.ops[0])
            })
        })
    }
    // 查询
    get(params) {
        return new Promise((resolve, reject) => {
            this.collection.find(params).toArray((error, result) => {
                error ? reject(error.message) : resolve(result[0] || null)
            })
        })
    }
    query(params) {
        return new Promise((resolve, reject) => {
            this.collection.find(params).toArray((error, result) => {
                error ? reject(error.message) : resolve(result)
            })
        })
    }
    // 更新
    update(query, updateParams) {
        return new Promise((resolve, reject) => {
            updateParams = Object.assign(updateParams, { timeUpdate: Date.now().toLocaleString('chinese', { hour12: false }) })
            this.collection.updateOne(query, { $set: updateParams }, (error, result) => {
                error ? reject(error.message) : resolve(result)
            })
        })
    }
    // 删除
    delete(_id) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne({ _id }, (error, result) => {
                if (error) {
                    reject(error)
                } else if (result.deletedCount !== 1) {
                    reject(`${_id} 不存在`)
                } else {
                    resolve(true)
                }
            })
        })
    }
}
