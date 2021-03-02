/** ****************************************************************
 * Operator是数据表的操作员
 * 需要一个数据库>数据表/集合指针来构造
 * 提供对数据库>数据表/集合的CRUD原子操作
 * *****************************************************************
 * SQL常用数据类型 *size位数 *d规定小数点右侧的最大位数
 * 1.整数 integer(size) int(size) smallint(size) tinyint(size)
 * 2.小数 decimal(size,d) numeric(size,d)
 * 3.固定长度的字符串 char(size)
 * 4.可变长度的字符串 varchar(size)
 * 5.日期 date(yyyymmdd)
 ******************************************************************* */
///<reference path='../../../../../type.d.ts' />
export default class OperatorSqlite3 implements DBOperatable {
    // Sqlite3
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
        // 在表字段操作结束后, 把定义的表字段全部清空 方便 model2TableStruct
        for (let key in this.TableStruct) this.TableStruct[key] = null

        return new Promise((resolve, reject) => {
            // SQLite3开始预定义数据库表结构
            let columns = 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
            for (let key in newStruct) {
                if (newStruct[key] === 'number') columns += `${key} INT, `
                if (newStruct[key] === 'string') columns += `${key} VARCHAR, `
            }
            columns += 'timeCreate INT, '
            columns += 'timeUpdate INT, '
            columns = columns.substring(0, columns.length - 2)
            const SQL = `CREATE TABLE IF NOT EXISTS ${TableName} (${columns});`
            this.TableCaller.run(SQL, async (error) => {
                if (error) {
                    reject(new Error(`${error.message}, SQL: ${SQL}`))
                    return
                }
                // 获取当前表结构
                const oldStruct = await this.getOldStruct()
                // 如果 newStruct 补充了新字段，则全量补充这个数据
                for (let column_new in newStruct) {
                    if (column_new === 'id') continue
                    if (column_new === 'timeCreate') continue
                    if (column_new === 'timeUpdate') continue
                    if (oldStruct[column_new]) continue
                    await this._createColumn(column_new, newStruct[column_new])
                }
                // 如果 newStruct 删除了旧字段，则全量删除这个数据
                for (let column_old in oldStruct) {
                    if (column_old === 'id') continue
                    if (column_old === 'timeCreate') continue
                    if (column_old === 'timeUpdate') continue
                    if (newStruct[column_old]) continue
                    await this._deleteColumn(column_old)
                }
                resolve(true)
            })
        })
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    create(doc: object): Promise<object> {
        // 1.记录的字段结构一定和init时的结构一致
        doc = this.model2TableStruct(doc)
        let columns = ''
        let values = ''
        for (let key in doc) {
            columns += `'${key}',`
            values += `'${doc[key]}',`
        }
        // 2.字段结构一定会有 id timeCreate timeUpdate
        columns += `timeCreate,`
        values += `'${Date.now()}',`
        columns += `timeUpdate,`
        values += `'${Date.now()}',`

        // 数据库操作
        columns = columns.substring(0, columns.length - 1)
        values = values.substring(0, values.length - 1)
        return new Promise((resolve, reject) => {
            const SQL = `INSERT INTO ${this.TableName} (${columns}) VALUES (${values});`
            this.TableCaller.run(SQL, function(error) {
                error ? reject(new Error(`${error.message}, SQL: ${SQL}`)) : resolve(this)
            })
        })
    }
    get(doc: object): Promise<object> {
        // Where
        let querySql = ''
        for (let key in doc) querySql += `${key}='${doc[key]}', `
        querySql = querySql.substring(0, querySql.length - 2)

        // 数据库操作
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${this.TableName} WHERE ${querySql}`
            this.TableCaller.get(sql, function(error, result) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(result || null)
            })
        })
    }
    query(doc: object): Promise<Array<object>> {
        // Where
        let querySql = ''
        for (let key in doc) querySql += `${key}='${doc[key]}', `
        querySql = querySql.substring(0, querySql.length - 2)

        // 数据库操作
        return new Promise((resolve, reject) => {
            let SQL = `SELECT * FROM ${this.TableName}`
            if (doc && Object.keys(doc).length) SQL += ` WHERE ${querySql}`
            this.TableCaller.all(SQL, function(error, result) {
                if (error) error = new Error(`${error.message}, SQL: ${SQL}`)
                error ? reject(error) : resolve(result)
            })
        })
    }
    update(query: object, doc: object): Promise<object> {
        // 0.更新的字段一定要是预定义字段
        let struct = this.getStruct()
        for (let key in doc) {
            if (key === 'id' || key === 'timeCreate' || key === 'timeUpdate') continue
            if (struct[key] === undefined) delete doc[key]
        }

        // 1.更新 timeUpdate
        doc = Object.assign(doc, { timeUpdate: Date.now() })

        // what
        let updateSql = ''
        for (let key in doc) updateSql += `${key}='${doc[key]}', `
        updateSql = updateSql.substring(0, updateSql.length - 2)

        // where
        let querySql = ''
        for (let key in query) querySql += `${key}='${query[key]}', `
        querySql = querySql.substring(0, querySql.length - 2)

        // 数据库操作
        return new Promise((resolve, reject) => {
            const SQL = `UPDATE ${this.TableName} SET ${updateSql} WHERE ${querySql}`
            this.TableCaller.run(SQL, function(error) {
                if (error) error = new Error(`${error.message}, SQL: ${SQL}`)
                error ? reject(error) : resolve(this)
            })
        })
    }
    delete(id: string | number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // *
            const SQL = `DELETE FROM ${this.TableName} WHERE id = '${id}';`
            this.TableCaller.run(SQL, function(error) {
                if (error) error = new Error(`${error.message}, SQL: ${SQL}`)
                error ? reject(error) : resolve(this)
            })
        })
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    getOldStruct(): Promise<object> {
        return new Promise((resolve, reject) => {
            let OldStruct = {}
            const sql = `SELECT * FROM SQLITE_MASTER WHERE TYPE='table' AND NAME='${this.TableName}';`
            this.TableCaller.get(sql, function(error, result) {
                if (error) {
                    reject(new Error(`${error.message}, SQL: ${sql}`))
                    return
                }
                let struct_str = result ? result.sql : null
                if (struct_str) {
                    struct_str = struct_str.replace(/\n/g, '')
                    struct_str = struct_str.substring(struct_str.indexOf('(') + 1, struct_str.length - 1).split(',')
                    for (let i in struct_str) {
                        let key = struct_str[i].trim().split(' ')[0]
                        OldStruct[key] = true
                    }
                }
                resolve(OldStruct)
            })
        })
    }
    getStruct(): object {
        return Object.assign({}, this.TableStruct)
    }
    model2TableStruct(newModel): object {
        let create = this.getStruct()
        for (let key in create) {
            newModel[key] ? (create[key] = newModel[key]) : ''
        }
        return create
    }
    private _createColumn(columnName, type): Promise<any> {
        if (type === 'number') type = 'INT'
        if (type === 'string') type = 'VARCHAR'
        return new Promise((resolve, reject) => {
            const sql = `ALTER TABLE ${this.TableName} ADD COLUMN ${columnName} ${type}`
            this.TableCaller.run(sql, function(error) {
                error ? reject(new Error(`${error.message}, SQL: ${sql}`)) : resolve(this)
            })
        })
    }
    private async _deleteColumn(columnName): Promise<any> {
        let OldStruct = await this.getOldStruct()
        let oldStruct_str = ''
        for (let key in OldStruct) key !== columnName ? (oldStruct_str += `${key}, `) : ''
        oldStruct_str = oldStruct_str.substring(0, oldStruct_str.length - 2)

        //
        return new Promise((resolve, reject) => {
            // 1
            const SQL1 = `CREATE TABLE IF NOT EXISTS ${this.TableName}_TEMP AS SELECT ${oldStruct_str} FROM ${this.TableName} WHERE 1 = 1;`
            this.TableCaller.run(SQL1, (error) => {
                if (error) {
                    reject(new Error(`${error.message}, SQL: ${SQL1}`))
                    return
                }

                // 2
                const SQL2 = `DROP TABLE IF EXISTS ${this.TableName};`
                this.TableCaller.run(SQL2, (error) => {
                    if (error) {
                        reject(new Error(`${error.message}, SQL: ${SQL2}`))
                        return
                    }

                    // 3
                    const SQL3 = `ALTER TABLE ${this.TableName}_TEMP RENAME TO ${this.TableName};`
                    this.TableCaller.run(SQL3, function(error) {
                        error ? reject(new Error(`${error.message}, SQL: ${SQL3}`)) : resolve(true)
                    })
                })
            })
        })
    }
}
