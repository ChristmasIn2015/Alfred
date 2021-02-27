import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//
import Yjy_Log from './dispatchers/Yjy_Log'

async function go() {
    try {
        const SOCKET_NUMBER = parseInt(process.argv[2])
        if (!SOCKET_NUMBER) throw new Error(`Please chose your socket number, now is ${SOCKET_NUMBER}`)

        // 1.链接MongoDB数据库服务，并创建数据库YjyLog
        let Cabin = new CabinExpress()
        await Cabin.dbLink('mongodb://127.0.0.1:27017/YjyLog')

        // 2.创建YjyLog的数据表及其操作员
        await Cabin.dbTabler([
            //
            { name: 'Log', struct: { ip: 'string', message: 'object' } },
        ])

        // 3.绑定业务的调度员
        global['$common'].bindClass(Cabin, 'Yjy_Log', Yjy_Log)
        // ....

        // 4.使用express暴漏调度方法给传输层
        Cabin.express(SOCKET_NUMBER, 'YjyLog')
        global['Cabin'] = Cabin // ts 找不到 bindClass 后的方法
        // @Yjy_Log
        Cabin.expressRoute('POST', '/yjy-log/create', global['Cabin'].createLog)
        Cabin.expressRoute('GET', '/yjy-log/list', global['Cabin'].getLogs)
        // ....

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
