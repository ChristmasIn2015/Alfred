import Cabin from '../../../database/Cabin.js'
import Server from '../../../database/mongoDB/Server.js'
import Operator from '../../../database/mongoDB/Operator.js'
//
import Log from './modules/Log.js'

async function go() {
    try {
        const SOCKET_NUMBER = process.argv[2]
        if (!SOCKET_NUMBER) throw new Error('请选择端口号')
        const DB_ADDRESS = 'mongodb://127.0.0.1:27017/YjyLog'

        // 1.链接MongoDB数据库服务
        global['$server'] = new Server(DB_ADDRESS)
        await global['$server'].start()
        // 2.创建MongoDB【数据库操作员】
        global['$db'] = {}
        let operators = [
            { name: 'Log', struct: { message: 'object' } },
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
        // ....
        // 4.暴漏调度方法给传输层(1.HttpExpress 2.ElectronIPC)
        global['Cabin'].exposeLink('POST', '/yjy-log/create', global['Cabin'].createLog)
        global['Cabin'].exposeLink('GET', '/yjy-log/list', global['Cabin'].getLogs)
        // ....

        // * End
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
