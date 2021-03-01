import Vuetify from '@/web/apps/Alfred/module/Vuetify.js'
import Login from '@/web/apps/Alfred/module/Login.js'
//
export default class ReactAPP {
    // admin
    menus = [
        { name: '用户列表', icon: 'fa-users', color: 'red', path: '/user/list' },
        { name: '日志列表', icon: 'fa-bell', color: 'indigo', path: '/log/list' },
        { name: '远程运维', icon: 'fa-cogs', color: 'purple', path: '/devops/list' },
    ]
    nowMenuIndex = -1
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @Vuetify
    @Login
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
