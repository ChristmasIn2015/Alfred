import CmdScript from '@/web/apps/SjCrow/modules/CmdScript.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @CmdScript
    @$common.TryCatch
    async initReact() {
        await this.renderScripts()
    }
}
