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
// * 这个类
export default class Operator {
    constructor(database) {}

    // 创建一条记录
    create(doc) {
        return new Promise((resolve, reject) => {})
    }
    // 查询记录
    get(params) {
        return new Promise((resolve, reject) => {})
    }
    query(params) {
        return new Promise((resolve, reject) => {})
    }
    // 更新记录
    update(query, updateParams) {
        return new Promise((resolve, reject) => {})
    }
    // 删除记录
    delete(_id) {
        return new Promise((resolve, reject) => {})
    }
}
