import Login from '@/webapps/sjShop/module/Login.js'
import Shop from '@/webapps/sjShop/module/Shop.js'
import House from '@/webapps/sjShop/module/House.js'

export default class React {
    constructor() {
        this.sideList = [
            { name: '员工管理', icon: 'fa fa-users' },
            { name: '库存管理', icon: 'fa fa-home' },
            { name: '订单管理', icon: 'fa-newspaper-o' },
        ]
        this.sideIndex = -1
        this.initReact()
    }
    // *
    @Login
    @Shop
    @House
    async initReact() {
        try {
            await this.initUserInfo() // Login
            await this.renderShopList() // Shop
            await this.renderHouseList() // House
        } catch (error) {
            $common.loadOff(error)
        }
    }
    // 点击侧边栏
    pickSide(index) {
        if (!this.iAmLogined()) return

        // 所有选项必须有店铺信息
        if (!$store.state.shopInfo._id) {
            $warn('请选择店铺')
            index = -1
        }

        // // 仓库管理 开单 订单管理必须选择了仓库
        if (index > 0 && !$store.state.houseInfo._id) {
            $warn('请选择仓库')
            index = -1
        }

        // *
        this.sideIndex = index
    }
    // 进行登录
    async loginConfirm() {
        try {
            await this.postLogin() // Login
            await this.renderShopList() // Shop
        } catch (error) {
            $common.loadOff(error)
        }
    }
    // 注销登录
    reLogin() {
        if (this.iAmLogined()) {
            $confirm('确实要注销登录吗?', () => {
                this.clearUserInfo() // @Login
                $store.commit('clearShopInfo')
                this.sideIndex = -1
            })
        }
    }
    // * 选择店铺
    pickShop(shop) {
        try {
            $store.commit('setShopInfo', shop)
            $store.commit('clearHouseInfo')
            this.sideIndex = -1
            this.renderHouseList() // @House
        } catch (error) {
            $common.loadOff(error)
        }
    }
    // * 选择仓库
    pickHouse(house) {
        try {
            if (!$store.state.shopInfo._id) return
            $store.commit('setHouseInfo', house)
            this.sideIndex = -1
        } catch (error) {
            $common.loadOff(error)
        }
    }
}
