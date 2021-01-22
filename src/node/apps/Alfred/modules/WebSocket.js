import Response from '../../../../database/Response.js'
import { excuteCmd, processDestory } from '../../../../database/ChildProcess.js'
import ws from 'nodejs-websocket'

export default class WebSocket {
    server = null
    connections = {}
    cmds = {}
    constructor() {
        this.server = ws
            .createServer((connection) => {
                const KEY = connection.key
                // 接受到客户端发送的消息
                connection.on('text', (order) => {
                    if (typeof order !== 'string') return
                    this.#handle(KEY, JSON.parse(order))
                })

                // 链接异常
                connection.on('close', (code) => {
                    delete this.connections[KEY]
                })
                connection.on('error', (code) => {
                    delete this.connections[KEY]
                })

                // 告知链接成功
                this.connections[KEY] = connection
                this.#answer(KEY, { type: 'SUCCESS', KEY })
            })
            .listen(6999)
    }

    // 执行
    async #handle(KEY, order) {
        try {
            switch (order.type) {
                case 'CreateCMD':
                    let model = $db.Cmds.getStruct()
                    model.name = order.cmdModel.name
                    model.cmdString = order.cmdModel.cmdString
                    if (order.cmdModel._id) {
                        await $db.Cmds.update({ _id: order.cmdModel._id }, model)
                    } else {
                        await $db.Cmds.create(model)
                    }
                    this.#answer(null, { type: 'CreateCMD' })
                    break
                case 'RenderCmdList':
                    let list = await $db.Cmds.query()
                    this.#answer(null, { type: 'RenderCmdList', list })
                    break
                case 'DeleteCmd':
                    await $db.Cmds.delete(order._id)
                    this.#answer(null, { type: 'DeleteCmd' })
                    break
                case 'ExcuteCMD':
                    if (this.cmds[order.cmdId]) {
                        this.#answer(KEY, {
                            type: 'ExcuteCMD',
                            answer: { message: 'CMD执行中', DTO: { pid: this.cmds[order.cmdId], listIndex: order.index } },
                        })
                    } else {
                        const PID = excuteCmd(order.cmdString, {
                            answer: (answer) => {
                                // message DTO: { pid }
                                answer.DTO['listIndex'] = order.index
                                this.#answer(null, { type: 'ExcuteCMD', answer })
                                if (PID && answer.DTO.pid && answer.DTO.pid !== 'Loading') {
                                    this.cmds[order.cmdId] = PID
                                } else {
                                    delete this.cmds[order.cmdId]
                                }
                            },
                        })
                    }
                    break
                case 'DestoryCMD':
                    if (this.cmds[order.cmdId]) {
                        const PID = this.cmds[order.cmdId]
                        processDestory(PID)
                        delete this.cmds[order.cmdId]
                    }
                    break
            }
        } catch (error) {
            this.#answer(KEY, { type: 'Error', message: error.message })
        }
    }

    // 发送
    #answer(KEY, data) {
        if (KEY === null) {
            for (let key in this.connections) this.connections[key].sendText(JSON.stringify(data))
        } else {
            if (!data || !KEY || !this.connections[KEY]) return
            this.connections[KEY].sendText(JSON.stringify(data))
        }
    }
}
