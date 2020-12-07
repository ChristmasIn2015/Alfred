import Server from '../../mongoDB/Server.js'
import Operator from '../../mongoDB/Operator.js'
import _Error from './modules/Error.js'
import User from './modules/User.js'
import Shop from './modules/Shop.js'
import Employee from './modules/Employee.js'
import House from './modules/House.js'
import Tag from './modules/Tag.js'
import Good from './modules/Good.js'
import Order from './modules/Order.js'
import Customer from './modules/Customer.js'
class Cabin {
    // * 基础
    express = require('express')
    expressAPP = null
    // * 业务
    socketNumber = null
    server = null
    operatorList = [] // * 操作员Operator可以对数据库进行增删改查
    dispatcherList = [] // * 调度员Dispatcher控制多个操作员
    appList = [] // * 接口列表

    constructor(socketNumber) {
        if (socketNumber) {
            this.socketNumber = socketNumber
            this.expressAPP = this.express()
            this.initCabin() // ASYNC
        } else {
            console.log('请配置正确的端口', socketNumber)
        }
    }

    // 初始化服务控制台
    async initCabin() {
        try {
            // 1 创建数据库链接
            this.server = new Server('mongodb://127.0.0.1:27017', 'sjShop')
            await this.server.start()

            // 2 初始化数据库操作员
            this.operatorList = ['Error', 'User', 'Shop', 'Employee', 'House', 'Tag', 'Good', 'GoodTag', 'Order', 'Customer']
            for (let key in this.operatorList) {
                let dbName = this.operatorList[key]
                let collection = await this.server.getCollection(dbName)
                this[dbName] = new Operator(collection)
            }

            // 3 绑定调度员并暴露调度方法
            this.#initDispatcher()

            // 4 启动Express服务
            this.#initExpress()
        } catch (error) {
            let message = typeof error === 'string' ? error : error.message
            console.log(getRedLog(message))
            console.log()
            process.exit()
        }
    }

    // * 初始化调度员
    #initDispatcher() {
        this.#bindDispatcher('_Error', _Error)
        this.appList.push({ method: 'POST', route: '/sjShop/error/create', next: this.addError })
        this.appList.push({ method: 'GET', route: '/sjShop/error/list', next: this.getErrorList })

        this.#bindDispatcher('User', User)
        this.appList.push({ method: 'POST', route: '/sjShop/user/login', next: this.login })
        this.appList.push({ method: 'GET', route: '/sjShop/user/info', next: this.getUserInfo })

        this.#bindDispatcher('Shop', Shop)
        this.appList.push({ method: 'POST', route: '/sjShop/shop/create', next: this.addShop })
        this.appList.push({ method: 'GET', route: '/sjShop/shop/list', next: this.getShopList })
        this.appList.push({ method: 'POST', route: '/sjShop/shop/delete', next: this.deleteShop })

        this.#bindDispatcher('Employee', Employee)
        this.appList.push({ method: 'POST', route: '/sjShop/employee/create', next: this.addEmployee })
        this.appList.push({ method: 'POST', route: '/sjShop/employee/list', next: this.getEmployeeList })

        this.#bindDispatcher('House', House)
        this.appList.push({ method: 'POST', route: '/sjShop/house/create', next: this.addHouse })
        this.appList.push({ method: 'POST', route: '/sjShop/house/list', next: this.getHouseList })

        this.#bindDispatcher('Tag', Tag)
        this.appList.push({ method: 'POST', route: '/sjShop/tag/create', next: this.addTag })
        this.appList.push({ method: 'POST', route: '/sjShop/tag/plugList', next: this.getPlugList })
        this.appList.push({ method: 'POST', route: '/sjShop/tag/delete', next: this.deleteTag })

        this.#bindDispatcher('Good', Good)
        this.appList.push({ method: 'POST', route: '/sjShop/good/create', next: this.addGood })
        this.appList.push({ method: 'POST', route: '/sjShop/good/list', next: this.getGoodList })
        this.appList.push({ method: 'POST', route: '/sjShop/good/edit', next: this.updateGood })
        this.appList.push({ method: 'POST', route: '/sjShop/good/delete', next: this.deleteGood })

        this.#bindDispatcher('Order', Order)
        this.appList.push({ method: 'POST', route: '/sjShop/order/create', next: this.addOrder })
        this.appList.push({ method: 'POST', route: '/sjShop/order/list', next: this.getOrderList })
        this.appList.push({ method: 'POST', route: '/sjShop/order/changeStatus', next: this.changeOrderStatus })
        this.appList.push({ method: 'POST', route: '/sjShop/order/clearOrderGood', next: this.clearOrderGood })
        this.appList.push({ method: 'POST', route: '/sjShop/order/updateOrder', next: this.updateOrder })

        this.#bindDispatcher('Customer', Customer)
        this.appList.push({ method: 'POST', route: '/sjShop/customer/create', next: this.addCustomer })
        this.appList.push({ method: 'POST', route: '/sjShop/customer/list', next: this.getCustomerList })
    }

    #initExpress() {
        this.expressAPP.all('*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', '*')
            res.header('Access-Control-Allow-Methods', '*')
            next()
        })
        this.appList.forEach((app) => {
            if (app.method === 'GET') {
                this.expressAPP.get(app.route, (request, response) => app.next(request, response, this))
            }
            if (app.method === 'POST') {
                this.expressAPP.post(app.route, require('body-parser').json(), (request, response) => app.next(request, response, this))
            }
        })

        // 前端HTML分配
        // const vuePath = require('path').join(__dirname, '../dist')
        // this.expressAPP.use(express.static(vuePath))
        // this.expressAPP.get('/sjShop', (request, response) => response.sendFile(`${vuePath}/sjShop.html`))

        this.expressAPP.listen(this.socketNumber)
        this.printCabinInfo()
    }

    // * 将某个类原型上的所有方法绑定到this的原型上
    #bindDispatcher(TargetClassName, TargetClass) {
        if (this.__proto__ && TargetClass.prototype) {
            // 1.在this的原型上创建目标对象
            this.__proto__[TargetClassName] = new TargetClass()
            // 2.在this的原型上绑定目标对象的所有方法
            Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
                if (functionName === 'docs') return // continue
                if (functionName === 'constructor') return // continue
                this.__proto__[functionName] = (...args) => {
                    let origin = this.__proto__[TargetClassName]
                    return origin[functionName].apply(origin, args)
                }
            })
        }
    }

    // * 获取Cabin信息
    printCabinInfo() {
        if (global.process.platform === 'win32') {
            const interfaces = require('os').networkInterfaces()
            for (let index in interfaces) {
                if (index === '以太网') {
                    for (let key in interfaces[index]) {
                        let value = interfaces[index][key]
                        if (value.family === 'IPv4') {
                            console.log()
                            console.log(getGreenLog(' 数据服务链接成功 '), this.server.dbAddress)
                            console.log(getGreenLog(' Web服务启动成功  '), getLink(`http://${value.address}:${this.socketNumber}`))
                            console.log()
                            break
                        }
                    }
                    break
                }
            }
        }
    }
}
// * manager
global.Server_SanJi_Shop = Cabin

//
function getRedLog(message) {
    return `\x1B[41m\x1B[30m${message}\x1B[0m`
}
function getYellowLog(message) {
    return `\x1B[43m\x1B[30m${message}\x1B[0m`
}
function getBlueLog(message) {
    return `\x1B[44m\x1B[37m${message}\x1B[0m`
}
function getGreenLog(message) {
    return `\x1B[42m\x1B[30m${message}\x1B[0m`
}
function getLink(message) {
    return `\x1B[34m${message}\x1B[0m`
}
function getText(message) {
    return `\x1B[33m${message}\x1B[0m`
}
