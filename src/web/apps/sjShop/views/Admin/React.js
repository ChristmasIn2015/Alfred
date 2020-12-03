import Login from '@/web/apps/sjShop/module/Login.js'
import Shop from '@/web/apps/sjShop/module/Shop.js'
import House from '@/web/apps/sjShop/module/House.js'

export default class React {
    constructor() {
        this.sideList = [
            { name: '员工管理', icon: 'fa fa-users', type: 'warning' },
            { name: '库存管理', icon: 'fa fa-home', type: 'success' },
            { name: '销售开单', icon: 'fa fa-newspaper-o', type: 'info' },
        ]
        this.sideIndex = -1
        this.initReact()
    }

    @Login
    @Shop
    @House
    @$common.TryCatch
    async initReact() {
        await this.initUserInfo() // @Login
        await this.renderShopList() // @Shop
        await this.renderHouseList() // @House
    }

    // 点击侧边栏
    pickSide(index) {
        if (!this.iAmLogined()) return
        // 所有选项必须有店铺信息
        if (!$store.state.shopInfo._id) {
            $warn('请选择店铺')
            index = -1
        }
        // 仓库管理 开单 订单管理必须选择了仓库
        if (index > 0 && !$store.state.houseInfo._id) {
            $warn('请选择仓库')
            index = -1
        }
        this.sideIndex = index
    }

    // 登录框点击确定
    @$common.TryCatch
    async loginModalOk() {
        await this.postLogin() // @Login
        await this.renderShopList() // @Shop
    }

    // 注销登录
    reLogin() {
        if (!this.iAmLogined()) return
        $confirm('确实要注销登录吗?', () => {
            this.clearUserInfo() // @Login
            $store.commit('clearShopInfo')
            this.sideIndex = -1
        })
    }

    // 选择店铺
    @$common.TryCatch
    async pickShop(shop) {
        $store.commit('setShopInfo', shop)
        $store.commit('clearHouseInfo')
        this.sideIndex = -1
        await this.renderHouseList() // @House
    }

    // 选择仓库
    pickHouse(house) {
        if (!$store.state.shopInfo._id) return
        $store.commit('setHouseInfo', house)
        this.sideIndex = -1
    }
}
