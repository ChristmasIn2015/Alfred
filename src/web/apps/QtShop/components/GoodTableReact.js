import CenterGood from '@/web/apps/QtShop/module/CenterGood.js'
//
export default class GoodTableReact {
    constructor() {
        this.initReact() // ASYNC
    }

    @CenterGood
    async initReact() {
        try {
            //
        } catch (error) {
            $common.loadOff(error)
        }
    }
}
