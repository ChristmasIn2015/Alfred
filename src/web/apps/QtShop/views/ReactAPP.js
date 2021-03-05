import Vuetify from '@/web/apps/Alfred/module/Vuetify.js'
import Login from '@/web/apps/Alfred/module/Login.js'
//
export default class ReactAPP {
    // admin
    menus = [
        { name: '仓廪', icon: 'fa-cubes', color: 'indigo', path: '/shop/center' },
        { name: '吏部', icon: 'fa-users', color: 'red', path: '/' },
        { name: '销售中心', icon: 'fa-phone-square', color: 'purple', path: '/' },
        { name: '发货中心', icon: 'fa-plane', color: 'purple', path: '/' },
    ]
    nowMenuIndex = -1
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @Vuetify // Alfred ！！
    @Login // Alfred ！！
    async initReact() {
        try {
            // @Vuetify
            window['$load'] = {
                show: () => this.vuetifyLoadShow(),
                hide: () => this.vuetifyLoadHide(),
            }
            window['$tip'] = (message) => this.vuetifyTip(message)
            window['$warn'] = (message) => this.vuetifyWarn(message)
            window['$confirm'] = (a, b, c) => this.vuetifyConfirm(a, b, c)

            //
            $load.show()
            await this.initUserInfo() // @Login
            $load.hide()
        } catch (error) {
            this.clearLocalUserInfo() // @Login
            window['$common'].loadOff(error)
            this.loginModal = true // @Login
            $router.push({ path: '/' })
        }
    }

    // 点击侧边栏
    pickRoute(index) {
        if (!this.iAmLogined()) {
            this.nowMenuIndex = -1
            return // @Login
        }
        const target = this.menus[index]
        if (target) {
            if ($router.app._route.path === target.path) return
            this.nowMenuIndex = index
            $router.push({ path: target.path })
        } else {
            if ($router.app._route.path === '/') return
            this.nowMenuIndex = -1
            $router.push({ path: '/' })
        }
    }

    // 登录框点击确定
    @$common.Loadding
    async loginModalOk() {
        await this.postLogin() // @Login
    }

    // 注销登录
    reLogin() {
        if (!this.iAmLogined()) return
        $confirm('确认', '确实要注销登录吗?', (answer) => {
            if (!answer) return
            localStorage['token-qqlx'] = ''
            $store.commit('clearUserInfo')
            this.nowMenuIndex = -1
            $router.push({ path: '/' })
        })
    }
}
