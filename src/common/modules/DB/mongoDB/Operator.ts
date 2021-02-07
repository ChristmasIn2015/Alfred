/** ****************************************************************
 * Operator是数据表的操作员
 * 需要一个数据库>数据表/集合指针来构造
 * 提供对数据库>数据表/集合的CRUD原子操作
 ******************************************************************* */
import { ObjectId } from 'mongodb'
import { DBOperatable, TableCaller, TableStruct } from '../DBType'

export default class Operator implements DBOperatable {
    // MongoDB
    TableName = null
    TableStruct = null
    TableCaller = null
    constructor(caller: TableCaller) {
        this.TableCaller = caller
    }

    // 初始化某表操作员
    async init(TableName: string, newStruct: TableStruct): Promise<boolean> {
        this.TableName = TableName
        this.TableStruct = newStruct

        // 获取当前表结构
        const OldStruct = await this.getOldStruct()
        if (!OldStruct) return true
        // 如果 newStruct 补充了新字段，则全量补充这个新字段
        for (let columnName in newStruct) {
            if (columnName === '_id') continue
            if (columnName === 'timeCreate') continue
            if (columnName === 'timeUpdate') continue
            if (OldStruct[columnName] === undefined) {
                let newColumn = {}
                newColumn[columnName] = null
                await this.TableCaller.updateMany({}, { $set: newColumn })
            }
        }
        // 如果 newStruct 删除了旧字段，则全量删除这个旧字段
        for (let columnName in OldStruct) {
            if (columnName === '_id') continue
            if (columnName === 'timeCreate') continue
            if (columnName === 'timeUpdate') continue
            if (newStruct[columnName] === undefined) {
                let newColumn = {}
                newColumn[columnName] = null
                await this.TableCaller.updateMany({}, { $unset: newColumn })
            }
        }
        // NoSQL不需要预定义表结构
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
    // 删除
    async delete(id): Promise<boolean> {
        let result = await this.TableCaller.deleteOne({ _id: id })
        if (result.deletedCount !== 1) throw new Error(`${id} 不存在`)
        return true
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    async getOldStruct(): Promise<TableStruct> {
        const OldStruct = await this.get({})
        return OldStruct
    }
    getStruct(): TableStruct {
        return Object.assign({}, this.TableStruct)
    }
    model2TableStruct(newModel): TableStruct {
        let struct = this.getStruct()
        for (let key in struct) newModel[key] !== undefined ? (struct[key] = newModel[key]) : ''
        return struct
    }
}
