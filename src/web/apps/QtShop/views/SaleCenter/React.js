import CenterCustomer from '@/web/apps/QtShop/module/CenterCustomer.js'
//
export default class ReactSaleCenter {
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @CenterCustomer
    async initReact() {
        try {
            $load.show()
            await this.renderCustomerList() // @CenterCustomer
            $load.hide()
        } catch (error) {
            window['$common'].loadOff(error)
        }
    }
}
