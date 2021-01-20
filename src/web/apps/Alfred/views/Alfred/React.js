import { SERVE_ADDRESS } from '@/web/apps/Alfred/modules/api.js'
import WsConnection from '@/web/apps/Alfred/modules/WsConnection.js'
import Cmds from '@/web/apps/Alfred/modules/Cmds.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @Cmds
    @WsConnection
    @$common.TryCatch
    async initReact() {
        await this.connectionBuild(`ws://${SERVE_ADDRESS}:6999`)
        this.connectionOrder({ type: 'RenderCmdList' })
    }
}
