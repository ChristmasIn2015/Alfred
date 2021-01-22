import { getUserInfo, shopUserLogin } from './api.js'
export default function Login(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * params
        this.loginModal = false
        this.userModel = {
            name: '',
            phone: '',
            password: '',
        }
        // * function
        this.iAmLogined = iAmLogined
        this.postLogin = postLogin
        this.initUserInfo = initUserInfo
        this.clearUserInfo = clearUserInfo
        // *
        sourceFunction.apply(this, arguments)
    }
    return descriptor
}

// 判断是否登录，如果没有登录则唤起登录框
function iAmLogined() {
    let token = localStorage['qt-shopToken'] ? true : false
    if (!token) this.loginModal = true
    return token
}

// 登录
async function postLogin() {
    try {
        if (!this.userModel.phone) throw new Error('手机号码不能为空')
        if (!this.userModel.password) throw new Error('密码不能为空')
        let info = await shopUserLogin(this.userModel.name, this.userModel.phone, this.userModel.password)
        localStorage['qt-shopToken'] = info.authorization
        $store.commit('setUserInfo', info)
        $tip('登录成功')
        this.loginModal = false
    } catch (error) {
        return Promise.reject(error)
    }
}

// 初始化用户信息
async function initUserInfo() {
    try {
        $store.commit('clearUserInfo')
        let info = await getUserInfo()
        $store.commit('setUserInfo', info)
        this.loginModal = false
    } catch (error) {
        this.loginModal = true
        localStorage['qt-shopToken'] = ''
        $store.commit('clearUserInfo')
        $store.commit('clearShopInfo')
        $store.commit('clearHouseInfo')
        return Promise.reject(error)
    }
}

// 清空本地用户/店铺/仓库数据
function clearUserInfo() {
    localStorage['qt-shopToken'] = ''
    $store.commit('clearUserInfo')
    $store.commit('clearShopInfo')
    $store.commit('clearHouseInfo')
}
