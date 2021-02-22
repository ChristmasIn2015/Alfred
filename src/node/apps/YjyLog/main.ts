import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//
import Dispatcher_Log from './dispatchers/Dispatcher_Log.js'

async function go() {
    try {
        const SOCKET_NUMBER = process.argv[2]
        if (!SOCKET_NUMBER) throw new Error('请选择端口号')

        // 1.链接MongoDB数据库服务
        let Cabin = new CabinExpress()
        await Cabin.dbLink('mongodb://127.0.0.1:27017/YjyLog')

        // 2.创建YjyLog的数据库及其操作员
        await Cabin.dbTabler([
            //
            { name: 'Log', struct: { message: 'object' } },
        ])

        // 3.绑定业务的调度员
        global['$common'].bindClass(Cabin, 'Dispatcher_Log', Dispatcher_Log)
        // ....

        // 4.暴漏调度方法给传输层
        global['Cabin'] = Cabin // ts 找不到 bindClass 后的方法
        Cabin.expressRoute('POST', '/yjy-log/create', global['Cabin'].createLog)
        Cabin.expressRoute('GET', '/yjy-log/list', global['Cabin'].getLogs)
        // ....

        // 5.绑定Html
        const htmlPath = require('path').join(process.cwd(), './src/web/dist')
        const YjyLogIndex = require('path').join(process.cwd(), './src/web/dist/YjyLog.html')
        Cabin.expressHtml('/yjyLog', htmlPath, YjyLogIndex)

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
