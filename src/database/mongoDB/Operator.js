import { ObjectId } from 'mongodb'
export default class Operator {
    // MongoDB
    DBCaller = null
    TableName = null
    TableStruct = null
    constructor(caller) {
        this.DBCaller = caller
    }
    // 预定义表结构
    async init(TableName, newStruct) {
        this.TableName = TableName
        this.TableStruct = newStruct

        // 获取当前表结构
        let oldStruct = await this.get({})
        if (!oldStruct) return
        // 如果 newStruct 补充了新字段，则全量补充这个新字段
        for (let columnName in newStruct) {
            if (columnName === 'id') continue
            if (columnName === 'timeCreate') continue
            if (columnName === 'timeUpdate') continue
            if (oldStruct[columnName] === undefined) {
                let newColumn = {}
                newColumn[columnName] = null
                await this.DBCaller.updateMany({}, { $set: newColumn })
            }
        }
        // 如果 newStruct 删除了旧字段，则全量删除这个旧字段
        for (let columnName in oldStruct) {
            if (columnName === 'id') continue
            if (columnName === 'timeCreate') continue
            if (columnName === 'timeUpdate') continue
            if (newStruct[columnName] === undefined) {
                let newColumn = {}
                newColumn[columnName] = null
                await this.DBCaller.updateMany({}, { $unset: newColumn })
            }
        }
        // NoSQL不需要预定义表结构
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================

    // 获取字段结构
    getStruct() {
        return Object.assign({}, this.TableStruct)
    }
    #getStructByModel(model) {
        let struct = this.getStruct()
        for (let key in struct) {
            let newValue = model[key]
            newValue !== undefined ? (struct[key] = newValue) : ''
        }
        return struct
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // 创建一条记录
    async create(doc) {
        // 1.记录的字段结构一定和init时的结构一致
        doc = this.#getStructByModel(doc)
        // 2.字段结构一定会有 id timeCreate timeUpdate
        const now = Date.now()
        doc = Object.assign(doc, { id: String(new ObjectId()), timeCreate: now, timeUpdate: now })

        // *.数据库操作
        let result = await this.DBCaller.insertOne(doc, { forceServerObjectId: true })
        return result.ops[0]
    }
    // 查询
    get(params) {
        return new Promise((resolve, reject) => {
            this.DBCaller.find(params).toArray((error, result) => {
                error ? reject(error.message) : resolve(result[0] || null)
            })
        })
    }
    query(params) {
        return new Promise((resolve, reject) => {
            this.DBCaller.find(params).toArray((error, result) => {
                error ? reject(error.message) : resolve(result)
            })
        })
    }
    // 更新
    async update(query, doc) {
        // 0.更新的字段一定要是预定义字段
        let struct = this.getStruct()
        for (let key in doc) {
            if (key === 'id' || key === 'timeCreate' || key === 'timeUpdate') continue
            if (struct[key] === undefined) delete doc[key]
        }

        // 1.更新 timeUpdate
        doc = Object.assign(doc, { timeUpdate: Date.now() })

        // *.数据库操作
        let result = await this.DBCaller.updateMany(query, { $set: doc })
        return result
    }
    // 删除
    async delete(id) {
        let result = await this.DBCaller.deleteOne({ id })
        if (result.deletedCount !== 1) throw new Error(`${id} 不存在`)
        return true
    }
}
