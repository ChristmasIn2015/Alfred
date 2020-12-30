import Server from '../../../../database/sqlite3/Server.js'
import Operator from '../../../../database/sqlite3/Operator.js'
import Note from './modules/Note.js'

export default class Cabin {
    server = null
    constructor() {
        this.#initCabin() // ASYNC
    }

    // 初始化服务控制台
    async #initCabin() {
        try {
            // 1 创建数据库链接
            this.server = new Server('SjCrow', require('path').join(process.cwd(), './src/electron/apps/SjCrow/Database/SjCrow.db'))
            await this.server.start()

            // 2 初始化数据库的CRUD操作员
            const LIST_NOTE = [
                { name: 'Block', struct: { id: 'number', name: 'string' } },
                { name: 'Shelf', struct: { id: 'number', name: 'string' } },
                { name: 'Book', struct: { id: 'number', name: 'string', content: 'string' } },
            ]
            for (let index in LIST_NOTE) {
                let TableName = LIST_NOTE[index].name
                this[TableName] = new Operator(this.server.db)
                await this[TableName].init(TableName, LIST_NOTE[index].struct)
            }

            // 3 暴露调度员的调度方法给Cabin，其再交给调度员，调度方法需要能找到数据库操作员
            this.#bindDispatcher('Note', Note)

            // 4 启动Express服务
        } catch (error) {
            let message = typeof error === 'string' ? error : error.message
            console.log(`\x1B[41m\x1B[30m InitCabin Error: ${message} \x1B[0m`)
            process.exit()
        }
    }

    // * 将某个类原型上的所有方法绑定到this的原型上
    #bindDispatcher(TargetClassName, TargetClass) {
        if (this.__proto__ && TargetClass.prototype) {
            // 1.在this的原型上创建目标对象
            this.__proto__[TargetClassName] = new TargetClass()
            // 2.在this的原型上绑定目标对象的所有方法
            Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
                if (functionName === 'constructor') return // continue
                this.__proto__[functionName] = (...args) => {
                    let origin = this.__proto__[TargetClassName]
                    return origin[functionName].apply(origin, args)
                }
            })
        }
    }
}
