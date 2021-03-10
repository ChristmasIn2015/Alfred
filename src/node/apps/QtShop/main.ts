import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//
import QtShop_Shop from './dispatchers/QtShop_Shop'
import QtShop_House from './dispatchers/QtShop_House'
import QtShop_Employee from './dispatchers/QtShop_Employee'
import QtShop_Customer from './dispatchers/QtShop_Customer'

async function go() {
    try {
        const SOCKET_NUMBER = parseInt(process.argv[2])
        if (!SOCKET_NUMBER) throw new Error(`Please chose your socket number, now is ${SOCKET_NUMBER}`)

        // 1.链接MongoDB数据库服务，并创建数据库QtShop
        let Cabin = new CabinExpress()
        await Cabin.dbLink('mongodb://127.0.0.1:27017/QtShop')

        // 2.创建QtShop的数据表及其操作员
        await Cabin.dbTabler([
            {
                // 店铺
                name: 'Shop',
                struct: { name: 'string' },
            },
            {
                // 根据用户找到店铺, 用户得角色是 0 店长 1 员工
                name: 'ShopByUser',
                struct: { userId: 'string', role: 'number', shopId: 'string' },
            },
            {
                // 仓库
                name: 'House',
                struct: { name: 'string' },
            },
            {
                // 根据店铺找到仓库
                name: 'HouseByShop',
                struct: { shopId: 'string', houseId: 'string' },
            },
            {
                // 商品
                name: 'Good',
                struct: { name: 'string', norm: 'string' },
            },
            // {
            //     // 根据用户找到商品
            //     name: 'GoodByUser',
            //     struct: { goodId: 'string', userId: 'string' },
            // },
            {
                // 根据仓库找到商品, 及这个商品在这个仓库的库存/库存单位/备注
                name: 'GoodByHouse',
                struct: { houseId: 'string', goodId: 'string', count: 'number', countName: 'string', remark: 'string' },
            },
            {
                // 客户
                name: 'Customer',
                struct: { name: 'string', contact: 'string', remark: 'string' },
            },
            {
                // 根据用户找到客户 @一般是店长
                name: 'CustomerByUser',
                struct: { userId: 'string', customerId: 'string' },
            },
            {
                // 订单
                name: 'Order',
                struct: { createrId: 'string', remark: 'string' },
            },
            {
                // 根据客户找到订单
                name: 'OrderByCustomer',
                struct: { customerId: 'string', orderId: 'string' },
            },
            {
                // 根据订单找到商品，及这个商品售出的库存/单位/备注 @transportStatus 0 未发货 1 已发货
                name: 'GoodByOrder',
                struct: { orderId: 'string', goodId: 'string', count: 'number', countName: 'string', remark: 'string', transportStatus: 'number' },
            },
        ])

        // 3.绑定业务的调度员
        global['$common'].bindClass(Cabin, 'QtShop_Shop', QtShop_Shop)
        global['$common'].bindClass(Cabin, 'QtShop_House', QtShop_House)
        global['$common'].bindClass(Cabin, 'QtShop_Employee', QtShop_Employee)
        global['$common'].bindClass(Cabin, 'QtShop_Customer', QtShop_Customer)
        // ....

        // 4.使用express暴漏调度方法给传输层
        Cabin.express(SOCKET_NUMBER, 'QtShop')
        global['Cabin'] = Cabin // ts 找不到 bindClass 后的方法
        // @QtShop_Shop
        Cabin.expressRoute('POST', '/qt-shop/shop/create', global['Cabin'].createShop)
        Cabin.expressRoute('GET', '/qt-shop/shop/list', global['Cabin'].getShopList)
        Cabin.expressRoute('POST', '/qt-shop/shop/delete', global['Cabin'].deleteShop)
        // @QtShop_House
        Cabin.expressRoute('POST', '/qt-shop/house/create', global['Cabin'].createHouse)
        Cabin.expressRoute('POST', '/qt-shop/house/list', global['Cabin'].getHouseList)
        // @QtShop_Employee
        Cabin.expressRoute('POST', '/qt-shop/employee/list', global['Cabin'].getEmployeeList)
        // @QtShop_Good
        Cabin.expressRoute('POST', '/qt-shop/good/create', global['Cabin'].createGoodInHouse)
        Cabin.expressRoute('POST', '/qt-shop/good/list', global['Cabin'].getGoodListInHouse)
        // @QtShop_Customer
        Cabin.expressRoute('POST', '/qt-shop/customer/create', global['Cabin'].addCustomer)
        Cabin.expressRoute('POST', '/qt-shop/customer/list', global['Cabin'].getCustomerList)
        // ....

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
