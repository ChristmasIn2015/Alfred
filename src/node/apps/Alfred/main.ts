import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//
import Dispatcher_User from './dispatchers/Dispatcher_User'

async function go() {
    try {
        const SOCKET_NUMBER = parseInt(process.argv[2])
        if (!SOCKET_NUMBER) throw new Error(`please chose a socket number, now is ${SOCKET_NUMBER}`)

        // 1.链接MongoDB数据库服务, 并创建数据库
        let Cabin = new CabinExpress()
        await Cabin.dbLink('mongodb://127.0.0.1:27017/Alfred')

        // 2.创建Alfred的数据表及其操作员
        await Cabin.dbTabler([
            // 服务于Alfred的注册用户管理/权限管理功能
            // {
            //     name: 'User',
            //     struct: {
            //         name: 'string',
            //         phone: 'string',
            //         password: 'string', // 仅保存MD5加密后的密码
            //         authorization: 'string', // 可解析出 name/phone/lastTime
            //         lastTime: 'number',
            //     },
            // },
            // // 服务于Alfred的日志功能
            // { name: 'Log', struct: { ip: 'string', message: 'any' } },
            // // 服务于Alfred的远程执行CMD功能
            // { name: 'Cmds', struct: { name: 'string', command: 'string' } },
        ])

        // 3.绑定业务的调度员
        // global['$common'].bindClass(Cabin, 'Dispatcher_User', Dispatcher_User)
        // ....

        // 4.使用express暴漏调度方法给传输层
        Cabin.express(SOCKET_NUMBER, 'Alfred')
        // global['Cabin'] = Cabin // ts 找不到 bindClass 后的方法
        // Cabin.expressRoute('POST', '/yjy-log/create', global['Cabin'].createLog)
        Cabin.expressRoute('GET', '/alfred/yjy-log/list', null, `${Cabin.cabinInfo.IPv4}:7001/yjy-log/list`)
        // ....

        // 5.绑定Html（YjyLog没有前端页面）
        // const htmlPath = require('path').join(process.cwd(), './src/web/dist')
        // const YjyLogIndex = require('path').join(process.cwd(), './src/web/dist/YjyLog.html')
        // Cabin.expressHtml('/yjyLog', htmlPath, YjyLogIndex)

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log('Alfred Error:', error.message)
        process.exit()
    }
}
go()
