import WsHandler from '@/web/apps/Alfred/module/WsHandler.js'
import WsCmd from '@/web/apps/Alfred/module/WsCmd.js'
//
export default class ReactDevOps {
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @WsCmd
    @WsHandler
    async initReact() {
        try {
            $load.show()
            this.setWsOrderMap()
            await this.wsReLink()
            $load.hide()
        } catch (error) {
            $common.loadOff(error)
            this.wsClose()
        }
    }
    // 刷新长链接
    async wsReLink() {
        try {
            $load.show()
            this.wsClose() // @WsHandler
            await this.wsLink('ws://10.52.2.35/dev-ops') // @WsHandler
            this.renderCmdList() // ASYNC @Cmd
            $load.hide()
        } catch (error) {
            $common.loadOff(error)
        }
    }
    // 设置长链接响应函数
    setWsOrderMap() {
        // @WsHandler
        this.WS_ORDER_MAP = {
            '/getRemoteCmdList': (orderAnswer) => {
                this.cmds = Object.assign([], orderAnswer.DTO) // @Cmd
            },
            '/createRemoteCmd': (orderAnswer) => {
                $tip(orderAnswer.DTO)
                this.renderCmdList() // ASYNC @Cmd
                this.cmdModal = false
            },
            '/deleteRemoteCmd': (orderAnswer) => {
                $tip(orderAnswer.DTO)
                this.renderCmdList() // ASYNC @Cmd
            },
            '/updateRemoteCmd': (orderAnswer) => {
                $tip(orderAnswer.DTO)
                this.renderCmdList() // ASYNC @Cmd
                this.cmdModal = false
            },
            '/excuteRemoteCmd': (orderAnswer) => {
                // @Cmd
                let target = this.cmds[orderAnswer.DTO.logListIndex]
                if (target) {
                    target.pid = orderAnswer.DTO.pid
                    target.log += orderAnswer.DTO.html
                    this.cmds = Object.assign([], this.cmds)
                }
            },
            '/killRemoteCmd': (orderAnswer) => {
                // @Cmd
                let target = this.cmds[orderAnswer.DTO.logListIndex]
                if (target) {
                    target.pid = orderAnswer.DTO.pid
                    target.log += orderAnswer.DTO.html
                    this.cmds = Object.assign([], this.cmds)
                }
            },
        }
    }
    // 渲染远程命令列表
    getRemoteCmdList() {}
}
