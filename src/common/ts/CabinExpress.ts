import { DBTabler } from '../modules/DB/Type'
import { ClassBindable } from '../modules/Common'
//
import ServerMongo from '../modules/DB/mongoDB/ServerMongo'
import OperatorMongo from '../modules/DB/mongoDB/OperatorMongo'

export default class CabinExpress implements ClassBindable {
    cabinDB = null
    cabinInfo = null
    cabinHandler = null // Express
    OriginMap: Map<string, object> = new Map() // ClassBindable
    //
    EXPRESS = null
    BODY_PARSE = null
    NODE_HTTP_PROXY = null
    constructor() {
        this.EXPRESS = require('express')
        this.BODY_PARSE = require('body-parser')
        this.NODE_HTTP_PROXY = require('http-proxy').createProxyServer()
    }

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
                next()
            })
            this.cabinHandler.listen(SOCKET_NUMBER, '0.0.0.0')
        }
    }
    // Express：数据接口分配
    expressRoute(method: string, route: string, next: (request, response) => any, proxyTarget?: string) {
        if (!this.cabinInfo.SOCKET_NUMBER) return
        const DO_Next = (request, response) => {
            if (proxyTarget) {
                // 转发给其他服务
                console.log('Proxy', proxyTarget)
                this.NODE_HTTP_PROXY.web(request, response, { target: proxyTarget })
            } else {
                // 使用当前进程的服务
                next(request, response)
            }
        }
        switch (method) {
            case 'GET':
                this.cabinHandler.get(route, DO_Next)
                break
            case 'POST':
                this.cabinHandler.post(route, this.BODY_PARSE.json(), DO_Next)
                break
        }
    }
    // Express：HTML分配
    expressHtml(route, htmlPath, indexPath) {
        if (this.cabinInfo.SOCKET_NUMBER) return
        this.cabinHandler.use(this.EXPRESS.static(htmlPath))
        this.cabinHandler.get(route, (request, response) => response.sendFile(indexPath))
    }
    // Express: 暴漏一个地址, 进行反向代理
    expressProxy(origin: string, target: string) {
        if (!this.cabinInfo.SOCKET_NUMBER) return
        // switch (method) {
        //     case 'GET':
        //         break
        //     case 'POST':
        //         break
        // }
        // this.NODE_HTTP_PROXY.createProxyServer().web(req, res, {
        //     target,
        // })
    }
}
