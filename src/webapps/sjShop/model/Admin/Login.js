export function LoginParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.loginModal = false
        this.userPhone = ''
        this.userPassword = ''
        // *
        sourceFunction.apply(this, arguments)
    }
}
import { getUserInfo, shopUserLogin } from '../api.js'
export function LoginFunc(TargetClass) {
    TargetClass.prototype.iAmLogined = iAmLogined
    TargetClass.prototype.chargeLogin = chargeLogin
    TargetClass.prototype.postLogin = postLogin
    TargetClass.prototype.initUserInfo = initUserInfo
    TargetClass.prototype.clearUserInfo = clearUserInfo
}
// * 点击登录按钮
function chargeLogin() {
    if (this.iAmLogined()) this.clearUserInfo()
}
// * 判断是否登录，如果没有登录则唤起登录框
function iAmLogined() {
    let notLogin = localStorage['sjShopToken'] ? false : true
    if (notLogin) {
        $warn('尚未登录')
        this.loginModal = true
    }
    return !notLogin
}
// * 登录
async function postLogin() {
    try {
        $load.show()
        if (!this.userPhone) throw new Error('手机号码不能为空')
        if (!this.userPassword) throw new Error('密码不能为空')
        let info = await shopUserLogin('', this.userPhone, this.userPassword)
        localStorage['sjShopToken'] = info.authorization
        $store.commit('setUserInfo', info)
        $tip('登录成功')
        $load.hide()
        this.loginModal = false
    } catch (error) {
        $common.loadOff(error)
    }
}
// * 初始化用户信息
async function initUserInfo() {
    try {
        $load.show()
        $store.commit('clearUserInfo')
        this.shopInfo = {}
        this.houseInfo = {}
        let info = await getUserInfo()
        $store.commit('setUserInfo', info)
        this.loginModal = false
        $load.hide()
    } catch (error) {
        this.userInfo = {}
        $common.loadOff(error)
    }
}
// * 注销登录
function clearUserInfo() {
    this.vue.$Modal.warning({
        title: '确实要注销登录吗?',
        onOk: () => {
            localStorage['sjShopToken'] = ''
            $store.commit('clearUserInfo')
            $store.commit('clearShopInfo')
            $store.commit('clearHouseInfo')
        },
    })
}
