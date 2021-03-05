import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//
import QtShop_Shop from './dispatchers/QtShop_Shop'
import QtShop_House from './dispatchers/QtShop_House'

async function go() {
    try {
        const SOCKET_NUMBER = parseInt(process.argv[2])
        if (!SOCKET_NUMBER) throw new Error(`Please chose your socket number, now is ${SOCKET_NUMBER}`)

        // 1.链接MongoDB数据库服务，并创建数据库QtShop
        let Cabin = new CabinExpress()
        await Cabin.dbLink('mongodb://127.0.0.1:27017/QtShop')

        // 2.创建QtShop的数据表及其操作员
        await Cabin.dbTabler([
            //
            { name: 'Shop', struct: { name: 'string' } },
            // ShopByUser: role 0 店长 1 员工
            { name: 'ShopByUser', struct: { shopId: 'string', userId: 'string', role: 'number' } },
            { name: 'House', struct: { name: 'string' } },
            { name: 'HouseByShop', struct: { houseId: 'string', shopId: 'string' } },
        ])

        // 3.绑定业务的调度员
        global['$common'].bindClass(Cabin, 'QtShop_Shop', QtShop_Shop)
        global['$common'].bindClass(Cabin, 'QtShop_House', QtShop_House)
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
        // ....

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
