import Server from '../../../../database/sqlite3/Server.js'

export default class Cabin {
    server = null
    constructor() {
        this.#initCabin() // ASYNC
    }

    // 初始化服务控制台
    async #initCabin() {
        try {
            // 1 创建数据库链接
            console.log('0 创建数据库链接中...')
            this.server = new Server('SjCrow', require('path').join(process.cwd(), './src/electron/apps/SjCrow/Database/SjCrow.db'))
            await this.server.start()
            console.log('1 成功 创建数据库链接', this.server)

            // 2 初始化数据库操作员
            const LIST_NOTE = ['Block', 'Shelf', 'Book', 'BlockShelfBook']
            for (let index in LIST_NOTE) {
                let result = await this.server.getTable(LIST_NOTE[index], `id int`)
                console.log(result)
            }
            console.log('2 成功 初始化数据库操作员')

            // 3 绑定调度员并暴露调度方法
            // 4 启动Express服务
        } catch (error) {
            let message = typeof error === 'string' ? error : error.message
            console.log(`\x1B[41m\x1B[30m InitCabin Error: ${message} \x1B[0m`)
            process.exit()
        }
    }
}
