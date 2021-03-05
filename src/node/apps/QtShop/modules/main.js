import Cabin from '../../../database/Cabin.js'
import Server from '../../../database/mongoDB/Server.js'
import Operator from '../../../database/mongoDB/Operator.js'
//
import Log from './Log.js'
import User from './User.js'
import Shop from './Shop.js'
import Employee from './Employee.js'
import House from './House.js'
import Tag from './Tag.js'
import Good from './Good.js'
import Order from './Order.js'
import Customer from './Customer.js'

async function go() {
    try {
        const SOCKET_NUMBER = process.argv[2]
        if (!SOCKET_NUMBER) throw new Error('请选择端口号')
        const DB_ADDRESS = 'mongodb://127.0.0.1:27017/QtShop'

        // 1.链接MongoDB数据库服务
        global['$server'] = new Server(DB_ADDRESS)
        await global['$server'].start()
        // 2.创建YjyLog的【MongoDB数据库操作员】
        global['$db'] = {}
        let operators = [
            {
                name: 'Log',
                struct: {
                    ip: null,
                    message: '',
                },
            },
            {
                name: 'User',
                struct: {
                    name: '',
                    phone: '',
                    password: '',
                    authorization: '',
                    //
                    shopIds: [],
                    officeIds: [],
                },
            },
            {
                name: 'Shop',
                struct: {
                    name: '',
                },
            },
            { name: 'Employee', struct: { shopId: '', userId: '', role: '' } },
            {
                name: 'House',
                struct: {
                    name: -1,
                    byShopId: '',
                },
            },
            {
                name: 'Tag',
                struct: {
                    name: '',
                    value: '',
                },
            },
            {
                name: 'Good',
                struct: {
                    byHouseId: -1,
                    name: '',
                    cost: 0,
                },
            },
            {
                name: 'GoodTag',
                struct: {
                    goodId: '',
                    tagId: '',
                    tagType: '', // 0 规格 1 库存
                },
            },
            {
                name: 'Order',
                struct: {
                    byHouseId: null,
                    customer: {},
                    orderPrice: 0,
                    goodListFake: [],
                    goodList: [],
                    goodStatus: 10, // 10 未发货 11 已发货
                    priceStatus: 20, // 20 未回款 21 已回款
                },
            },
            {
                name: 'Customer',
                struct: {
                    companyName: '',
                    companyAddress: '',
                    contact: '',
                    byUserId: '',
                },
            },
            //
        ]
        for (let i in operators) {
            const OperatorName = operators[i].name
            const TablePointer = await global['$server'].getCollection(OperatorName)
            global['$db'][OperatorName] = new Operator(TablePointer)
            await global['$db'][OperatorName].init(OperatorName, operators[i].struct)
        }
        // 3.初始化控制台/使其绑定【业务调度员】
        global['Cabin'] = null
        global['Cabin'] = new Cabin(SOCKET_NUMBER)
        global['Cabin'].bindDispatcher('Log', Log)
        global['Cabin'].bindDispatcher('User', User)
        global['Cabin'].bindDispatcher('Shop', Shop)
        global['Cabin'].bindDispatcher('Employee', Employee)
        global['Cabin'].bindDispatcher('House', House)
        global['Cabin'].bindDispatcher('Tag', Tag)
        global['Cabin'].bindDispatcher('Good', Good)
        global['Cabin'].bindDispatcher('Order', Order)
        global['Cabin'].bindDispatcher('Customer', Customer)
        // ....
        // 4.暴漏调度方法给传输层(1.HttpExpress 2.ElectronIPC)
        // @Log
        global['Cabin'].exposeHttpRoute('POST', '/yjy-log/create', global['Cabin'].createLog)
        global['Cabin'].exposeHttpRoute('GET', '/yjy-log/list', global['Cabin'].getLogs)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/error/create', global['Cabin'].addError)
        global['Cabin'].exposeHttpRoute('GET', '/qt-shop/error/list', global['Cabin'].getErrorList)

        // 'User', User)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/user/login', global['Cabin'].login)
        global['Cabin'].exposeHttpRoute('GET', '/qt-shop/user/info', global['Cabin'].getUserInfo)

        // 'Shop', Shop)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/shop/create', global['Cabin'].addShop)
        global['Cabin'].exposeHttpRoute('GET', '/qt-shop/shop/list', global['Cabin'].getShopList)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/shop/delete', global['Cabin'].deleteShop)

        // 'Employee', Employee)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/employee/create', global['Cabin'].addEmployee)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/employee/list', global['Cabin'].getEmployeeList)

        // 'House', House)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/house/create', global['Cabin'].addHouse)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/house/list', global['Cabin'].getHouseList)

        // 'Tag', Tag)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/tag/create', global['Cabin'].addTag)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/tag/plugList', global['Cabin'].getPlugList)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/tag/delete', global['Cabin'].deleteTag)

        // 'Good', Good)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/good/create', global['Cabin'].addGood)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/good/list', global['Cabin'].getGoodList)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/good/edit', global['Cabin'].updateGood)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/good/delete', global['Cabin'].deleteGood)

        // 'Order', Order)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/order/create', global['Cabin'].addOrder)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/order/list', global['Cabin'].getOrderList)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/order/changeStatus', global['Cabin'].changeOrderStatus)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/order/clearOrderGood', global['Cabin'].clearOrderGood)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/order/updateOrder', global['Cabin'].updateOrder)

        // 'Customer', Customer)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/customer/create', global['Cabin'].addCustomer)
        global['Cabin'].exposeHttpRoute('POST', '/qt-shop/customer/list', global['Cabin'].getCustomerList)
        // ....

        // 5.绑定Html
        const htmlPath = require('path').join(process.cwd(), './src/web/dist')
        const QtShopIndex = require('path').join(process.cwd(), './src/web/dist/QtShop.html')
        global['Cabin'].exposeHtml('/QtShop', htmlPath, QtShopIndex)

        // * End
        console.log('QtShop:', global.Cabin.info)
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
