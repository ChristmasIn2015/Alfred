import Login from '@/web/apps/Alfred/module/Login.js'
import CenterShop from '@/web/apps/QtShop/module/CenterShop.js'
import CenterHouse from '@/web/apps/QtShop/module/CenterHouse.js'
import CenterEmployee from '@/web/apps/QtShop/module/CenterEmployee.js'
//
export default class ReactHall {
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @Login // @Alfred
    @CenterShop
    @CenterHouse
    @CenterEmployee
    async initReact() {
        try {
            $load.show()
            // @Login
            await this.initUserInfo()
            // @CenterShop
            await this.renderShopList()
            $tip('获取店铺成功')
            // @CenterHouse
            this.houseList = []
            // @CenterEmployee
            this.employeeList = []
            $load.hide()
        } catch (error) {
            window['$common'].loadOff(error)
            this.clearLocalUserInfo() // @Login
            this.loginModal = true // @Login
        }
    }

    // 登录框点击确定
    @$common.Loadding
    async loginModalOk() {
        await this.postLogin() // @Login
        this.initReact() // ASYNC
    }

    // 注销登录
    reLogin() {
        if (!this.iAmLogined()) return
        $confirm('确认', '确实要注销登录吗?', (answer) => {
            if (!answer) return
            //
            this.shopList = [] // @CenterShop
            this.officeList = [] // @CenterShop
            this.houseList = [] // @CenterHouse
            //
            localStorage['token-qqlx'] = ''
            $store.commit('clearUserInfo')
            $store.commit('clearShopInfo')
            $store.commit('clearHouseInfo')
            this.nowMenuIndex = -1
            $router.push({ path: '/' })
        })
    }
}
