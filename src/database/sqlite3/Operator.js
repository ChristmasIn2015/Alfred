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
    db = null
    tableName = null
    struct = null
    constructor(database) {
        this.db = database
    }

    // 初始化数据库操作员
    init(tableName, struct) {
        this.tableName = tableName
        return new Promise((resolve, reject) => {
            // 将一个Object转化为SQL数据类型定义字符串
            let columns = ''
            for (let key in struct) {
                if (key === 'id') {
                    columns += `id INTEGER PRIMARY KEY AUTOINCREMENT, `
                } else {
                    if (struct[key] === 'number') columns += `${key} INT, `
                    if (struct[key] === 'string') columns += `${key} VARCHAR, `
                }
            }
            columns = columns.substring(0, columns.length - 2)

            // *
            this.struct = struct
            delete this.struct['id']

            // *
            const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`
            this.db.run(sql, function(error) {
                error ? reject(error) : resolve(this)
            })
        })
    }

    // 获取字段结构
    getModel() {
        return Object.assign({}, this.struct)
    }

    // 创建一条记录
    create(params) {
        return new Promise((resolve, reject) => {
            let columns = ''
            let values = ''
            for (let key in params) {
                columns += `'${key}',`
                values += `'${params[key]}',`
            }
            columns = columns.substring(0, columns.length - 1)
            values = values.substring(0, values.length - 1)

            // *
            const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values});`
            this.db.run(sql, function(error) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(this)
            })
        })
    }

    // 查询记录
    query(params) {
        return new Promise((resolve, reject) => {
            // where
            let querySql = ''
            for (let key in params) querySql += `${key}='${params[key]}', `
            querySql = querySql.substring(0, querySql.length - 2)

            // *
            let sql = `SELECT * FROM ${this.tableName}`
            if (params && Object.keys(params).length) sql += ` WHERE ${querySql}`
            this.db.all(sql, function(error, result) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(result)
            })
        })
    }
    get(params) {
        return new Promise((resolve, reject) => {
            // where
            let querySql = ''
            for (let key in params) querySql += `${key}='${params[key]}', `
            querySql = querySql.substring(0, querySql.length - 2)

            // *
            const sql = `SELECT * FROM ${this.tableName} WHERE ${querySql}`
            this.db.get(sql, function(error, result) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(result || null)
            })
        })
    }

    // 更新记录
    update(query, params) {
        return new Promise((resolve, reject) => {
            // where
            let querySql = ''
            for (let key in query) querySql += `${key}='${query[key]}', `
            querySql = querySql.substring(0, querySql.length - 2)

            // what
            let updateSql = ''
            for (let key in params) updateSql += `${key}='${params[key]}', `
            updateSql = updateSql.substring(0, updateSql.length - 2)

            // *
            const sql = `UPDATE ${this.tableName} SET ${updateSql} WHERE ${querySql}`
            this.db.run(sql, function(error) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(this)
            })
        })
    }

    // 删除记录
    delete(id) {
        return new Promise((resolve, reject) => {
            // *
            const sql = `DELETE FROM ${this.tableName} WHERE id = '${id}';`
            this.db.run(sql, function(error) {
                if (error) error = new Error(`${error.message}, SQL: ${sql}`)
                error ? reject(error) : resolve(this)
            })
        })
    }
}
