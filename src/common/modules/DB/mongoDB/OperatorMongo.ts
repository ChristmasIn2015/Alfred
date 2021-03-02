/** ****************************************************************
 * Operator是数据表的操作员
 * 需要一个数据库>数据表/集合指针来构造
 * 提供对数据库>数据表/集合的CRUD原子操作
 ******************************************************************* */
///<reference path='../../../../../type.d.ts' />
import { ObjectId } from 'mongodb'

export default class OperatorMongo implements DBOperatable {
    // MongoDB
    TableName = null
    TableStruct = null
    TableCaller = null
    constructor(caller: object) {
        this.TableCaller = caller
    }

    // 初始化某表操作员
    // 初始化某表操作员
    // 初始化某表操作员
    // 初始化某表操作员
    async init(TableName: string, newStruct: object): Promise<any> {
        this.TableName = TableName
        this.TableStruct = Object.assign({}, newStruct)
        // 这里把定义的表字段全部清空 方便 model2TableStruct
        for (let key in this.TableStruct) this.TableStruct[key] = null

        // 获取当前表结构
        const oldStruct = await this.getOldStruct()
        // 如果 newStruct 补充了新字段，则全量补充这个新字段
        for (let column_new in newStruct) {
            if (column_new === '_id') continue
            if (column_new === 'timeCreate') continue
            if (column_new === 'timeUpdate') continue
            if (oldStruct[column_new]) continue
            let DTO = {}
            DTO[column_new] = null
            // console.log('create', column_new)
            await this.TableCaller.updateMany({}, { $set: DTO })
        }
        // 如果 newStruct 删除了旧字段，则全量删除这个旧字段
        for (let column_old in oldStruct) {
            if (column_old === '_id') continue
            if (column_old === 'timeCreate') continue
            if (column_old === 'timeUpdate') continue
            if (newStruct[column_old]) continue
            let DELETE = {}
            DELETE[column_old] = null
            // console.log('delete', column_old)
            await this.TableCaller.updateMany({}, { $unset: DELETE })
        }
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    async create(doc: object): Promise<object> {
        // 1.记录的字段结构一定和init时的结构一致
        doc = this.model2TableStruct(doc)
        // 2.字段结构一定会有 _id timeCreate timeUpdate
        const now = Date.now()
        doc = Object.assign(doc, { _id: String(new ObjectId()), timeCreate: now, timeUpdate: now })

        // *.数据库操作
        let result = await this.TableCaller.insertOne(doc, { forceServerObjectId: true })
        return result.ops[0]
    }
    get(doc: object): Promise<object> {
        return new Promise((resolve, reject) => {
            this.TableCaller.find(doc).toArray((error, result) => {
                error ? reject(error.message) : resolve(result[0] || null)
            })
        })
    }
    query(doc: object): Promise<Array<object>> {
        return new Promise((resolve, reject) => {
            this.TableCaller.find(doc).toArray((error, result) => {
                error ? reject(error.message) : resolve(result)
            })
        })
    }
    async update(query: object, doc: object): Promise<object> {
        // 0.更新的字段一定要是预定义字段
        let struct = this.getStruct()
        for (let key in doc) {
            if (key === '_id' || key === 'timeCreate' || key === 'timeUpdate') continue
            if (struct[key] === undefined) delete doc[key]
        }

        // 1.更新 timeUpdate
        doc = Object.assign(doc, { timeUpdate: Date.now() })

        // *.数据库操作
        let result = await this.TableCaller.updateMany(query, { $set: doc })
        return result
    }
    async delete(_id): Promise<boolean> {
        let result = await this.TableCaller.deleteOne({ _id })
        if (result.deletedCount !== 1) throw new Error(`${_id} 不存在`)
        return true
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    async getOldStruct(): Promise<object> {
        let result = await this.get({})
        for (let key in result) result[key] = true
        return result || {}
    }
    getStruct(): object {
        return Object.assign({}, this.TableStruct)
    }
    model2TableStruct(newModel): object {
        let create = this.getStruct() || {}
        for (let key in create) {
            newModel[key] ? (create[key] = newModel[key]) : ''
        }
        return create
    }
}
