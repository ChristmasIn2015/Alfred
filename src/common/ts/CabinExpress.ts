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
    //
    NODE_WEBSOCKET = require('nodejs-websocket')
    NODE_WEBSOCKET_ConnectionMAP = {}
    NODE_WEBSOCKET_OrderMAP = {}
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
    expressProxy(proxyRoute: string, target: string, ws?: boolean) {
        // /some/route <= ipv4:80 <= other serve
        const option = { target, changeOrigin: true, ws }
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

    // WebSocket
    // WebSocket
    // WebSocket
    // WebSocket
    // WebSocket：建立一个长链接
    websocket(SOCKET_NUMBER: number, APP_NAME: string): Promise<any> {
        // 初始化该控制台信息
        this.cabinInfo = {
            CabinHandler: 'websocket',
            APP_NAME,
            IPv4: global['$common'].getIPv4(),
            SOCKET_NUMBER,
        }
        // 初始化长链接
        return new Promise((resolve, reject) => {
            if (!SOCKET_NUMBER) {
                reject(`请选择端口号:${SOCKET_NUMBER}`)
                return
            }
            this.cabinHandler = this.NODE_WEBSOCKET.createServer((connection) => {
                const KEY = connection.key
                // 标记当前链接
                this.NODE_WEBSOCKET_ConnectionMAP[KEY] = connection
                // 接受/处理客户端发送的消息
                connection.on('text', async (order: WebSocketOrder) => {
                    try {
                        if (typeof order !== 'string') return
                        order = JSON.parse(order)
                        order['connectionKey'] = KEY
                        const next = this.NODE_WEBSOCKET_OrderMAP[order.orderName]
                        if (!order.orderName || !next) return
                        await next(order)
                    } catch (error) {
                        this.websocketAnswer({ connectionKey: KEY, orderName: `${order.orderName}/error`, DTO: error.message })
                    }
                })
                // 链接主动/被动关闭
                connection.on('close', (code) => {
                    delete this.NODE_WEBSOCKET_ConnectionMAP[KEY]
                })
                // 链接异常
                connection.on('error', (code) => {
                    delete this.NODE_WEBSOCKET_ConnectionMAP[KEY]
                })
            })
            this.cabinHandler.listen(SOCKET_NUMBER)
            resolve(true)
        })
    }
    // 添加长链接命令的处理方法
    websocketRoute(orderName: string, next: () => Promise<any>) {
        if (!orderName) return
        this.NODE_WEBSOCKET_OrderMAP[orderName] = next
    }
    // 对某个链接主动发送消息
    websocketAnswer(order: WebSocketOrder) {
        const connection = this.NODE_WEBSOCKET_ConnectionMAP[order.connectionKey]
        if (!connection) return
        connection.sendText(JSON.stringify(order))
    }
    // 对现有的所有长链接广播
    websocketBoardCast(order: WebSocketOrder) {}
}
