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
export default class Operator {
    // Sqlite3
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

        console.log('newStruct', this.TableStruct)

        // 获取当前表结构
        let oldStruct = await this.#getNowStruct()
        // 如果 newStruct 补充了新字段，则全量补充这个数据
        if (Object.keys(oldStruct).length > 0) {
            for (let columnName in newStruct) {
                if (columnName === 'id') continue
                if (columnName === 'timeCreate') continue
                if (columnName === 'timeUpdate') continue
                if (oldStruct[columnName] === undefined) {
                    await this.#createColumn(columnName, newStruct[columnName])
                }
            }
        }
        // 如果 newStruct 删除了旧字段，则全量删除这个数据
        for (let columnName in oldStruct) {
            if (columnName === 'id') continue
            if (columnName === 'timeCreate') continue
            if (columnName === 'timeUpdate') continue
            if (newStruct[columnName] === undefined) {
                await this.#deleteColumn(columnName)
            }
        }
        // SQL需要预定义数据库表结构
        return new Promise((resolve, reject) => {
            let columns = 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
            for (let key in newStruct) {
                if (newStruct[key] === 'number') columns += `${key} INT, `
                if (newStruct[key] === 'string') columns += `${key} VARCHAR, `
            }
            columns += 'timeCreate INT, '
            columns += 'timeUpdate INT, '
            columns = columns.substring(0, columns.length - 2)
            const sql = `CREATE TABLE IF NOT EXISTS ${TableName} (${columns});`
            this.DBCaller.run(sql, function(error) {
                error ? reject(new Error(`${error.message}, SQL: ${sql}`)) : resolve(this)
            })
        })
    }
    #getNowStruct() {
        return new Promise((resolve, reject) => {
            let oldStruct = {}
            const sql = `SELECT * FROM SQLITE_MASTER WHERE TYPE='table' AND NAME='${this.TableName}';`
            this.DBCaller.get(sql, function(error, result) {
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
                        oldStruct[key] = true
                    }
                }
                resolve(oldStruct)
            })
        })
    }
    #createColumn(columnName, type) {
        if (type === 'number') type = 'INT'
        if (type === 'string') type = 'VARCHAR'
        //
        return new Promise((resolve, reject) => {
            const sql = `ALTER TABLE ${this.TableName} ADD COLUMN ${columnName} ${type}`
            this.DBCaller.run(sql, function(error) {
                error ? reject(new Error(`${error.message}, SQL: ${sql}`)) : resolve(this)
            })
        })
        //
    }
    async #deleteColumn(columnName) {
        let oldStruct = await this.#getNowStruct()
        let oldStruct_str = ''
        for (let key in oldStruct) key !== columnName ? (oldStruct_str += `${key}, `) : ''
        oldStruct_str = oldStruct_str.substring(0, oldStruct_str.length - 2)

        //
        return new Promise((resolve, reject) => {
            // 1
            let sql = `CREATE TABLE IF NOT EXISTS ${this.TableName}_TEMP AS SELECT ${oldStruct_str} FROM ${this.TableName} WHERE 1 = 1;`
            this.DBCaller.run(sql, (error) => {
                if (error) {
                    reject(new Error(`${error.message}, SQL: ${sql}`))
                    return
                }

                // 2
                sql = `DROP TABLE IF EXISTS ${this.TableName};`
                this.DBCaller.run(sql, (error) => {
                    if (error) {
                        reject(new Error(`${error.message}, SQL: ${sql}`))
                        return
                    }

                    // 3
                    let sql = `ALTER TABLE ${this.TableName}_TEMP RENAME TO ${this.TableName};`
                    this.DBCaller.run(sql, function(error) {
                        error ? reject(new Error(`${error.message}, SQL: ${sql}`)) : resolve(true)
                    })
                })
            })
        })
    }
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================
    // ============================================================================

    // 获取字段结构
    getStruct() {
        console.log('getStruct', this.TableStruct)
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
    create(doc) {
        // 1.记录的字段结构一定和init时的结构一致
        doc = this.#getStructByModel(doc)
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
            const sql = `INSERT INTO ${this.TableName} (${columns}) VALUES (${values});`
            this.DBCaller.run(sql, function(error) {
                error ? reject(new Error(`${error.message}, SQL: ${sql}`)) : resolve(this)
            })
        })
    }

    // 查询记录
    get(params) {
        // Where
        let querySql = ''
        for (let key in params) querySql += `${key}='${params[key]}', `
        querySql = querySql.substring(0, querySql.length - 2)

        // 数据库操作
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${this.TableName} WHERE ${querySql}`
            this.DBCaller.get(sql, function(error, result) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(result || null)
            })
        })
    }
    query(params) {
        // Where
        let querySql = ''
        for (let key in params) querySql += `${key}='${params[key]}', `
        querySql = querySql.substring(0, querySql.length - 2)

        // 数据库操作
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${this.TableName}`
            if (params && Object.keys(params).length) sql += ` WHERE ${querySql}`
            this.DBCaller.all(sql, function(error, result) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(result)
            })
        })
    }

    // 更新记录
    update(query, doc) {
        // 1.更新 timeUpdate
        doc = Object.assign(doc, { timeUpdate: Date.now() })

        console.log(doc)
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
            const sql = `UPDATE ${this.TableName} SET ${updateSql} WHERE ${querySql}`
            this.DBCaller.run(sql, function(error) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(this)
            })
        })
    }

    // 删除记录
    delete(id) {
        return new Promise((resolve, reject) => {
            // *
            const sql = `DELETE FROM ${this.TableName} WHERE id = '${id}';`
            this.DBCaller.run(sql, function(error) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(this)
            })
        })
    }
}
