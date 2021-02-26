//
import ServerMongo from '../modules/DB/mongoDB/ServerMongo'
import OperatorMongo from '../modules/DB/mongoDB/OperatorMongo'

export default class CabinExpress implements ClassBindable {
    //
    VUE_PATH = require('path').join(process.cwd(), './src/web/dist')
    BinderMap: Map<string, object> = new Map() // ClassBindable
    //
    cabinDB = null
    cabinHandler = null // Express
    cabinInfo: {
        CabinHandler: string
        APP_NAME: string
        IPv4: string
        SOCKET_NUMBER: number
    } = null
    //
    BODY_PARSE = require('body-parser')
    EXPRESS = require('express')
    EXPRESS_PROXY = require('http-proxy-middleware').createProxyMiddleware
    EXPRESS_AHTHO = {}
    constructor() {}

    // 数据库
    // 数据库
    // 数据库
    // 数据库
    // 数据库：和本地数据库服务进行链接
    async dbLink(DBAddress: string): Promise<any> {
        // mongodb://127.0.0.1:27017/dbName
        this.cabinDB = new ServerMongo(DBAddress)
        await this.cabinDB.start()
    }
    // 数据库：创建表 及其操作员
    async dbTabler(tablerList: DBTabler[]): Promise<any> {
        if (!global['$db']) global['$db'] = {}
        if (!this.cabinDB) throw new Error('数据库服务不存在')
        //
        for (let i in tablerList) {
            const OperatorName = tablerList[i].name
            const TablePointer = await this.cabinDB.getTableCaller(OperatorName)
            global['$db'][OperatorName] = new OperatorMongo(TablePointer)
            await global['$db'][OperatorName].init(OperatorName, tablerList[i].struct)
        }
    }
    // Express
    // Express
    // Express
    // Express
    // Express：初始化Express
    express(SOCKET_NUMBER: number, APP_NAME: string): void {
        // 初始化该控制台信息
        this.cabinInfo = {
            CabinHandler: 'express',
            APP_NAME,
            IPv4: global['$common'].getIPv4(),
            SOCKET_NUMBER,
        }
        // 初始化Express
        if (SOCKET_NUMBER) {
            this.cabinHandler = this.EXPRESS()
            this.cabinHandler.all('*', (request, response, next) => {
                response.header('Access-Control-Allow-Origin', '*')
                response.header('Access-Control-Allow-Headers', '*')
                response.header('Access-Control-Allow-Methods', '*')
                // TODO 未来这里要做防攻击处理
                next() // 执行其他 express/use 队列任务
            })
            this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH))
            this.cabinHandler.listen(SOCKET_NUMBER, '0.0.0.0')
        }
    }
    // Express：请求转发，即反向代理
    expressProxy(proxyRoute: string, target: string) {
        // /some/route <= ipv4:80 <= other serve
        const option = { target, changeOrigin: true }
        this.cabinHandler.use(proxyRoute, this.EXPRESS_PROXY(option))
    }
    // Express：HTML分配
    expressHtml(route: string, indexPath: string) {
        if (!this.cabinInfo.SOCKET_NUMBER) return
        this.cabinHandler.get(route, (request, response) => response.sendFile(indexPath))
    }
    // Express：数据接口分配
    expressRoute(method: string, route: string, next: (request, response) => any) {
        if (!this.cabinInfo.SOCKET_NUMBER) return
        switch (method) {
            case 'GET':
                this.cabinHandler.get(route, (request, response) => next(request, response))
                break
            case 'POST':
                this.cabinHandler.post(route, this.BODY_PARSE.json(), (request, response) => next(request, response))
                break
        }
    }
}
