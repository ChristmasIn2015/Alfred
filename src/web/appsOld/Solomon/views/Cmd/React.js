import Cmds from '@/web/apps/Solomon/modules/Cmds.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @Cmds
    @$common.Loading()
    async initReact() {
        await this.renderCmds()
    }
}
