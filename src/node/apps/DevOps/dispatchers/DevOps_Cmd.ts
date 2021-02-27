const AlfredLoginWS = global['$common'].AlfredLoginWS
import { excuteCmd, killCmd } from '../../../../common/ts/cmd'
export default class DevOps_Cmd {
    constructor() {}

    // @AlfredLoginWS()
    async getRemoteCmdList(order: WebSocketOrder) {
        let list = await global['$db'].Command.query({})
        order.DTO = list
        global['Cabin'].websocketAnswer(order)
    }

    // @AlfredLoginWS()
    async createRemoteCmd(order) {
        // order: WebSocketOrder
        const name = order.DTO.name
        const command = order.DTO.command
        if (!name) throw new Error(`No empty name: ${name}`)
        if (!command) throw new Error(`No empty command: ${command}`)
        await global['$db'].Command.create({ name, command })
        order.DTO = `db Command create ${name} success`
        global['Cabin'].websocketAnswer(order)
    }

    // @AlfredLoginWS()
    async excuteRemoteCmd(order) {
        let _id = order.DTO._id
        let result = await global['$db'].Command.get({ _id })
        if (!result) throw new Error(`can not find '${order.DTO.name}'`)

        // 执行CMD命令
        excuteCmd(result.command, (CmdAnswer: CmdAnswer) =>
            global['Cabin'].websocketAnswer({
                connectionKey: order.connectionKey,
                orderName: '/excuteRemoteCmd',
                DTO: CmdAnswer,
            })
        )
    }
}
