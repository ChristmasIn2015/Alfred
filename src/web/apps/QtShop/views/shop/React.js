import Login from '@/web/apps/Alfred/module/Login.js'
import ShopCenter from '@/web/apps/QtShop/module/ShopCenter.js'
import HouseCenter from '@/web/apps/QtShop/module/HouseCenter.js'
//
export default class ReactShopCenter {
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @Login
    @ShopCenter
    @HouseCenter
    async initReact() {
        try {
            $load.show()
            await this.renderShopList() // @ShopCenter
            $tip('获取店铺成功')
            this.houseList = [] // @HouseCenter
            $load.hide()
        } catch (error) {
            $common.loadOff(error)
        }
    }
}
