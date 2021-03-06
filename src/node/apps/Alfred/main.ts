import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//
import Alfred_User from './dispatchers/Alfred_User'

async function go() {
    try {
        const SOCKET_NUMBER = parseInt(process.argv[2])
        if (!SOCKET_NUMBER) throw new Error(`please chose a socket number, now is ${SOCKET_NUMBER}`)

        // 1.链接MongoDB数据库服务, 并创建数据库
        let Cabin = new CabinExpress()
        await Cabin.dbLink('mongodb://127.0.0.1:27017/Alfred')

        // 2.创建Alfred的数据表及其操作员
        await Cabin.dbTabler([
            // 注册用户管理/权限管理功能
            {
                name: 'User',
                struct: {
                    nickname: 'string',
                    account: 'string',
                    password: 'string', // 仅保存MD5加密后的密码
                    authorization: 'string', // 可解析出 name/phone/lastTime
                    authoTime: 'number',
                },
            },
        ])

        // 3.绑定业务的调度员
        global['$common'].bindClass(Cabin, 'Alfred_User', Alfred_User)

        // 4.1 暴漏调度方法给传输层
        Cabin.express(SOCKET_NUMBER, 'alfred')
        global['Cabin'] = Cabin // ts 找不到 bindClass 后的方法
        // @Alfred_User
        Cabin.expressRoute('POST', '/alfred/user/login', global['Cabin'].login)
        Cabin.expressRoute('POST', '/alfred/user/info', global['Cabin'].getUserInfo)
        Cabin.expressRoute('GET', '/alfred/user/list', global['Cabin'].getUserList)
        Cabin.expressRoute('POST', '/alfred/user/listById', global['Cabin'].getUserListById)

        // 4.2 反向代理
        // @DevOps
        const DevOps = `ws://${Cabin.cabinInfo.IPv4}:7000`
        Cabin.expressProxy('/dev-ops', DevOps, true)
        // @YjyLog
        const YjyLog = `http://${Cabin.cabinInfo.IPv4}:7001`
        Cabin.expressProxy('/yjy-log/list', YjyLog)
        Cabin.expressProxy('/yjy-log/create', YjyLog)
        // @QtShop
        const QtShop = `http://${Cabin.cabinInfo.IPv4}:7002`
        Cabin.expressProxy('/qt-shop/shop/create', QtShop)
        Cabin.expressProxy('/qt-shop/shop/list', QtShop)
        Cabin.expressProxy('/qt-shop/shop/delete', QtShop) //
        Cabin.expressProxy('/qt-shop/house/create', QtShop)
        Cabin.expressProxy('/qt-shop/house/list', QtShop) //
        Cabin.expressProxy('/qt-shop/employee/list', QtShop) //
        Cabin.expressProxy('/qt-shop/good/create', QtShop)
        Cabin.expressProxy('/qt-shop/good/list', QtShop) //
        Cabin.expressProxy('/qt-shop/customer/create', QtShop)
        Cabin.expressProxy('/qt-shop/customer/list', QtShop) //
        Cabin.expressProxy('/qt-shop/order/create', QtShop)
        Cabin.expressProxy('/qt-shop/order/list', QtShop) //

        // 5.绑定Html
        // 提供HTML服务给 Web*Alfred
        Cabin.expressHtml('/alfred', require('path').join(process.cwd(), './src/web/dist/Alfred.html'))
        Cabin.expressHtml('/qtShop', require('path').join(process.cwd(), './src/web/dist/QtShop.html'))

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log('Alfred Error:', error.message)
        process.exit()
    }
}
go()
