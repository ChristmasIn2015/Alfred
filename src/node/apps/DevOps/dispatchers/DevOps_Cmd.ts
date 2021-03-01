const WsResponse = global['$common'].WsResponse
const WsAlfredLogin = global['$common'].WsAlfredLogin
//
import { excuteCmd, killCmd } from '../../../../common/ts/cmd'
export default class DevOps_Cmd {
    cmdId_pid = {} // 保存正在执行的CMD进程
    constructor() {}

    @WsAlfredLogin()
    @WsResponse('获取远程命令成功', true)
    async getRemoteCmdList(order: WebSocketOrder) {
        let list = await global['$db'].Command.query({})
        list.forEach((e) => {
            e['pid'] = this.cmdId_pid[e._id] || null
            e['log'] = ''
        })
        return list
    }

    @WsAlfredLogin()
    @WsResponse('创建远程命令成功', true)
    async createRemoteCmd(order: WebSocketOrder) {
        const name = order.DTO.name
        const command = order.DTO.command
        if (!name) throw new Error(`No empty name: ${name}`)
        if (!command) throw new Error(`No empty command: ${command}`)
        await global['$db'].Command.create({ name, command })
        return `创建远程命令:${name}, 成功`
    }

    @WsAlfredLogin()
    @WsResponse('删除远程命令成功', true)
    async deleteRemoteCmd(order: WebSocketOrder) {
        const _id = order.DTO._id
        const name = order.DTO.name
        if (!_id) throw new Error('未找到远程命令')
        await global['$db'].Command.delete(_id)
        return `删除远程命令:${name}, 成功`
    }

    @WsAlfredLogin()
    @WsResponse('更新远程命令成功', true)
    async updateRemoteCmd(order: WebSocketOrder) {
        const _id = order.DTO._id
        if (!_id) throw new Error('未找到远程命令')
        const name = order.DTO.name
        const command = order.DTO.command
        if (!name) throw new Error(`No empty name: ${name}`)
        if (!command) throw new Error(`No empty command: ${command}`)
        await global['$db'].Command.update({ _id }, { name, command })
        return `编辑远程命令:${name}, 成功`
    }

    @WsAlfredLogin()
    async excuteRemoteCmd(order: WebSocketOrder) {
        let orderResponse = {
            connectionKey: order.connectionKey,
            orderName: '/request/fail',
            DTO: null,
        }
        try {
            const _id = order.DTO._id
            let result = await global['$db'].Command.get({ _id })
            if (this.cmdId_pid[_id]) throw new Error(`${result.name}, 正在运行`)
            if (!result) throw new Error(`找不到命令: ${order.DTO.name}`)

            // 执行CMD命令
            excuteCmd(result.command, (CmdAnswer: CmdAnswer) => {
                if (!this.cmdId_pid[_id]) {
                    // console.log('create', CmdAnswer.pid)
                    this.cmdId_pid[_id] = CmdAnswer.pid
                    // console.log('pid map', this.cmdId_pid)
                }

                global['Cabin'].websocketBoardCast({
                    connectionKey: order.connectionKey,
                    orderName: '/excuteRemoteCmd',
                    DTO: Object.assign({ logListIndex: order.DTO.logListIndex }, CmdAnswer),
                })
                if (!CmdAnswer.pid) {
                    // console.log('delete', this.cmdId_pid[_id])
                    delete this.cmdId_pid[_id]
                    // console.log('pid map', this.cmdId_pid)
                }
            })
        } catch (error) {
            orderResponse.DTO = error.message
            global['Cabin'].websocketBoardCast(orderResponse)
        }
    }

    @WsAlfredLogin()
    killRemoteCmd(order: WebSocketOrder) {
        try {
            const pid = order.DTO.pid
            if (!pid) throw new Error(`找不到进程: ${pid}`)

            // 执行CMD命令
            killCmd(pid)
            global['Cabin'].websocketBoardCast(order)
        } catch (error) {
            order.orderName = '/request/fail'
            order.DTO = error.message
            global['Cabin'].websocketBoardCast(order)
        }
    }
}
