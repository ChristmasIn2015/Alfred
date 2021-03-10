import Vuetify from '@/web/apps/Alfred/module/Vuetify.js'
import Login from '@/web/apps/Alfred/module/Login.js'
//
export default class ReactAPP {
    // admin
    menus = [
        { name: '店铺群', icon: 'fa-users', color: 'indigo', path: '/hall/center' },
        // { name: '销售中心', icon: 'fa-phone-square', color: 'purple', path: '/' },
        // { name: '发货中心', icon: 'fa-plane', color: 'purple', path: '/' },
    ]
    nowMenuIndex = -1
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @Vuetify // @Alfred
    @Login // @Alfred
    async initReact() {
        // @Vuetify
        window['$load'] = {
            show: () => this.vuetifyLoadShow(),
            hide: () => this.vuetifyLoadHide(),
        }
        window['$tip'] = (message) => this.vuetifyTip(message)
        window['$warn'] = (message) => this.vuetifyWarn(message)
        window['$confirm'] = (a, b, c) => this.vuetifyConfirm(a, b, c)
    }

    // 点击侧边栏
    pickRoute(index) {
        const target = this.menus[index]
        //
        if (target) {
            if ($router.app._route.path === target.path) return
            //     if (target.name === '销售中心' || target.name === '发货中心') {
            //         if ($store.state.shopInfo._id && $store.state.houseInfo._id) {
            //             //
            //         } else {
            //             $warn('请选择店铺和仓库')
            //             $router.push({ path: '/hall/center' })
            //         }
            //         return
            //     }
            this.nowMenuIndex = index
            $router.push({ path: target.path })
        } else {
            if ($router.app._route.path === '/') return
            this.nowMenuIndex = -1
            $router.push({ path: '/' })
        }
    }
}
