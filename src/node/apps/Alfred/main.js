/**
 * Alfred 是我们在服务器上24小时待命的专属管家，其拥有端口管理权限
 * 我们可以通过HTTP请求告知管家帮助我们
 *  0.获取当前服务情况
 *  1.向指定git仓库拉取代码
 *  2.在可使用的端口上部署HTTP服务
 *  3.终止某些端口上的服务
 */
import Cabin from '../../../database/Cabin.js'
import Server from '../../../database/mongoDB/Server.js'
import Operator from '../../../database/mongoDB/Operator.js'
//
import Log from './modules/Log.js'
import Manage from './modules/Manage.js'
import WebSocket from './modules/WebSocket.js'

async function go() {
    try {
        const SOCKET_NUMBER = process.argv[2]
        if (!SOCKET_NUMBER) throw new Error('请选择端口号')
        const DB_ADDRESS = 'mongodb://127.0.0.1:27017/Alfred'

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
        global['Cabin'].bindDispatcher('Manage', Manage)
        global['Cabin'].bindDispatcher('WebSocket', WebSocket)
        // ....
        // 4.暴漏调度方法给传输层(1.HttpExpress 2.ElectronIPC)
        global['Cabin'].exposeLink('GET', '/alfred/buildHTML', global['Cabin'].buildHTML)
        global['Cabin'].exposeLink('GET', '/alfred/buildServer', global['Cabin'].buildServer)
        global['Cabin'].exposeLink('GET', '/alfred/getAlfredInfo', global['Cabin'].getAlfredInfo)
        // ....
        console.log('Welcome Home, I am Alfred. ', global['Cabin'].info)

        // * End
    } catch (error) {
        console.log('Alfred Error:', error.message)
        process.exit()
    }
}
go()
