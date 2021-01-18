import WebSocket from '@/web/apps/Alfred/modules/WebSocket.js'
import Cmds from '@/web/apps/Alfred/modules/Cmds.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @Cmds
    @WebSocket
    @$common.TryCatch
    async initReact() {
        await this.renderCmds()
    }
}
