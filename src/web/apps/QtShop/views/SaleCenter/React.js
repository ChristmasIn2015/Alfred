import CenterCustomer from '@/web/apps/QtShop/module/CenterCustomer.js'
//
export default class ReactSaleCenter {
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
