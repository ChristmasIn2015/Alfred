import CenterGood from '@/web/apps/QtShop/module/CenterGood.js'
//
export default class GoodTableReact {
    constructor() {
        this.initReact() // ASYNC
    }

    @CenterGood
    async initReact() {
        try {
            $load.show()
            await this.renderGoodList() // @CenterGood
            $load.hide()
        } catch (error) {
            window['$common'].loadOff(error)
        }
    }
}
