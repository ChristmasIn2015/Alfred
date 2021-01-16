import WebSocket from '@/web/apps/Alfred/modules/WebSocket.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @WebSocket
    @$common.TryCatch
    async initReact() {
        await this.renderScripts()
    }
}
