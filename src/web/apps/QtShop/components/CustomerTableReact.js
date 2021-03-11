import CenterCustomer from '@/web/apps/QtShop/module/CenterCustomer.js'
//
export default class GoodTableReact {
    constructor() {
        this.initReact() // ASYNC
    }

    @CenterCustomer
    async initReact() {
        try {
            //
        } catch (error) {
            window['$common'].loadOff(error)
        }
    }
}
