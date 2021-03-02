import LocalCmd from '@/web/apps/Alfred/module/LocalCmd.js'
//
export default class ReactCmd {
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @LocalCmd
    async initReact() {
        try {
            $load.show()
            await this.renderCmdList() // @LocalCmd
            $load.hide()
        } catch (error) {
            $common.loadOff(error)
        }
    }
}
