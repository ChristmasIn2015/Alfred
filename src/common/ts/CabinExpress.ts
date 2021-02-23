import { DBTabler } from '../modules/DB/Type'
import { ClassBindable } from '../modules/Common'
//
import ServerMongo from '../modules/DB/mongoDB/ServerMongo'
import OperatorMongo from '../modules/DB/mongoDB/OperatorMongo'
import express from 'express'

export default class CabinExpress implements ClassBindable {
    cabinDB = null
    cabinInfo = null
    cabinHandler = null // Express
    OriginMap: Map<string, object> = new Map() // ClassBindable
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
            this.cabinHandler = express()
            this.cabinHandler.all('*', (request, response, next) => {
                response.header('Access-Control-Allow-Origin', '*')
                response.header('Access-Control-Allow-Headers', '*')
                response.header('Access-Control-Allow-Methods', '*')
                next()
            })
            this.cabinHandler.listen(SOCKET_NUMBER, '0.0.0.0')
        }
    }
    // Express：数据接口分配
    expressRoute(method, route, next) {
        if (this.cabinInfo.SOCKET_NUMBER) {
            if (method === 'GET') {
                this.cabinHandler.get(route, (request, response) => next(request, response))
            }
            if (method === 'POST') {
                this.cabinHandler.post(route, require('body-parser').json(), (request, response) => next(request, response))
            }
        }
    }
    // Express：HTML分配
    expressHtml(route, htmlPath, indexPath) {
        if (this.cabinInfo.SOCKET_NUMBER) {
            this.cabinHandler.use(express.static(htmlPath))
            this.cabinHandler.get(route, (request, response) => response.sendFile(indexPath))
        }
    }
}
