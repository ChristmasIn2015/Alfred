import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//
import DevOps_Cmd from './dispatchers/DevOps_Cmd'

async function go() {
    try {
        const SOCKET_NUMBER = parseInt(process.argv[2])
        if (!SOCKET_NUMBER) throw new Error(`Please chose your socket number, now is ${SOCKET_NUMBER}`)

        // 1.链接MongoDB数据库服务，并创建数据库DevOps
        let Cabin = new CabinExpress()
        await Cabin.dbLink('mongodb://127.0.0.1:27017/DevOps')

        // 2.创建DevOps的数据表及其操作员
        await Cabin.dbTabler([
            //
            { name: 'Command', struct: { name: 'string', command: 'string' } },
        ])

        // 3.绑定业务的调度员
        global['$common'].bindClass(Cabin, 'DevOps_Cmd', DevOps_Cmd)
        // ....

        // 4.暴漏调度方法给传输层
        await Cabin.websocket(SOCKET_NUMBER, 'DevOps')
        global['Cabin'] = Cabin // ts 找不到 bindClass 后的方法
        // @DevOps_Cmd
        Cabin.websocketRoute('/createRemoteCmd', global['Cabin'].createRemoteCmd)
        Cabin.websocketRoute('/getRemoteCmdList', global['Cabin'].getRemoteCmdList)
        Cabin.websocketRoute('/excuteRemoteCmd', global['Cabin'].excuteRemoteCmd)
        // ....

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
