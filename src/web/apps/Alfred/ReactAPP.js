import Login from '@/web/apps/Alfred/module/Login.js'
export default class ReactAPP {
    constructor() {
        // vuetify ui
        success = false
        successTip = '12213'
        warn = false
        warnTip = '12213'
        loadding = false
        confirm = false
        confirmTitle = ''
        confirmContent = ''
        confirmNext = null
        // admin
        this.menus = [
            { name: '用户列表', icon: 'fa-users', color: 'red', path: '/user/list' },
            { name: '日志列表', icon: 'fa-bell', color: 'indigo', path: '/log/list' },
            { name: '远程运维', icon: 'fa-cogs', color: 'purple', path: '/devops/list' },
        ]
        this.nowMenuIndex = -1
        //
        this.initReact() // ASYNC
    }

    @Login()
    async initReact() {
        try {
            await this.initUserInfo() // @Login
        } catch (error) {
            $common.loadOff(error)
            this.loginModal = true
            localStorage['token-qqlx'] = ''
            $store.commit('clearUserInfo')
        }
    }

    // 点击侧边栏
    pickRoute(index) {
        if (!this.iAmLogined()) return
        const target = this.menus[index]
        if (target) {
            if (this.$route.fullPath === target.path) return
            this.nowMenuIndex = index
            $router.push({ path: target.path })
        } else {
            if (this.$route.fullPath === '/') return
            this.nowMenuIndex = -1
            $router.push({ path: '/' })
        }
    }

    // 登录框点击确定
    @$common.Loading()
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
    @$common.Loading()
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
