import Server from '../../mongoDB/Server.js'
import Operator from '../../mongoDB/Operator.js'
import AppError from './modules/AppError.js'
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
            console.log('请配置正确端口', socketNumber)
        }
    }
    async initCabin() {
        try {
            // 1.创建数据库链接 并初始化操作员
            this.server = new Server('mongodb://127.0.0.1:27017', 'sjShop')
            await this.server.start()
            await this.initOperator()

            // 2.绑定调度员并暴露调度方法
            this.initDispatcher()

            // 3.启动Express服务
            this.initExpress()
        } catch (error) {
            typeof error === 'string' ? console.log(error) : console.log(error.message)
        }
    }
    async initOperator() {
        try {
            this.operatorList = ['Error']
            for (let key in this.operatorList) {
                let dbName = this.operatorList[key]
                let collection = await this.server.getCollection(dbName)
                this[dbName] = new Operator(collection)
            }
            this.operatorList
        } catch (error) {
            return Promise.reject(error)
        }
    }
    initDispatcher() {
        this.bindClass('AppError', AppError)
        this.appList.push({ method: 'POST', route: '/sjShop/error/create', next: this.addError }) // @AppError
        this.appList.push({ method: 'GET', route: '/sjShop/error/list', next: this.getErrorList }) // @AppError

        // // * PackUser
        // await this.initOperator('User')
        // appList.push({ method: 'POST', route: '/sjShop/user/login', next: this.UserPackager.login })
        // appList.push({ method: 'GET', route: '/sjShop/user/info', next: this.UserPackager.getUserInfo })

        // // * PackShop
        // // * PackEmployee
        // await this.initOperator('Employee')
        // await this.initOperator('Shop')
        // appList.push({ method: 'POST', route: '/sjShop/shop/create', next: this.ShopPackager.addShop }) // @Employee 0
        // appList.push({ method: 'GET', route: '/sjShop/shop/list', next: this.ShopPackager.getShopList }) // @Employee
        // appList.push({ method: 'POST', route: '/sjShop/shop/delete', next: this.ShopPackager.deleteShop }) // @Employee
        // appList.push({ method: 'POST', route: '/sjShop/employee/create', next: this.EmployeePackager.addEmployee }) // @Employee
        // appList.push({ method: 'POST', route: '/sjShop/employee/list', next: this.EmployeePackager.getEmployeeList }) // @Employee

        // // * PackHouse
        // await this.initOperator('House')
        // appList.push({ method: 'POST', route: '/sjShop/house/create', next: this.HousePackager.addHouse })
        // appList.push({ method: 'POST', route: '/sjShop/house/list', next: this.HousePackager.getHouseList })

        // // * PackTag
        // await this.initOperator('GoodTag')
        // await this.initOperator('Tag')
        // appList.push({ method: 'POST', route: '/sjShop/tag/create', next: this.TagPackager.addTag }) // @GoodTag 0
        // appList.push({ method: 'POST', route: '/sjShop/tag/plugList', next: this.TagPackager.getPlugList })
        // appList.push({ method: 'POST', route: '/sjShop/tag/delete', next: this.TagPackager.deleteTag })

        // // * PackGood
        // await this.initOperator('Good')
        // appList.push({ method: 'POST', route: '/sjShop/good/create', next: this.GoodPackager.addGood })
        // appList.push({ method: 'POST', route: '/sjShop/good/list', next: this.GoodPackager.getGoodList })
        // appList.push({ method: 'POST', route: '/sjShop/good/edit', next: this.GoodPackager.updateGood })
        // appList.push({ method: 'POST', route: '/sjShop/good/delete', next: this.GoodPackager.deleteGood })

        // // * PackOrder
        // await this.initOperator('Order')
        // appList.push({ method: 'POST', route: '/sjShop/order/create', next: this.OrderPackager.addOrder })
        // appList.push({ method: 'POST', route: '/sjShop/order/list', next: this.OrderPackager.getOrderList })
        // appList.push({ method: 'POST', route: '/sjShop/order/changeStatus', next: this.OrderPackager.changeOrderStatus })
        // appList.push({ method: 'POST', route: '/sjShop/order/clearOrderGood', next: this.OrderPackager.clearOrderGood })
        // appList.push({ method: 'POST', route: '/sjShop/order/updateOrder', next: this.OrderPackager.updateOrder })

        // // * Customer
        // await this.initOperator('Customer')
        // appList.push({ method: 'POST', route: '/sjShop/customer/create', next: this.CustomerPackager.addCustomer })
        // appList.push({ method: 'POST', route: '/sjShop/customer/list', next: this.CustomerPackager.getCustomerList })}
    }
    initExpress() {
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
    bindClass(TargetClassName, TargetClass) {
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
                            console.log(getGreenLog('数据服务链接成功'), this.server.dbAddress)
                            console.log(getGreenLog('Web服务启动成功 '), getLink(`http://${value.address}:${this.socketNumber}`))
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
