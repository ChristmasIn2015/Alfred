import CenterShop from '@/web/apps/QtShop/module/CenterShop.js'
//
export default class ReactOrderCenter {
    constructor() {
        //
        this.initReact() // ASYNC
    }

    async initReact() {
        try {
            $load.show()
            $load.hide()
        } catch (error) {
            window['$common'].loadOff(error)
        }
    }
}
