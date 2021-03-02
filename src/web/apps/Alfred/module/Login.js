import { getUserInfo, alfredUserLogin } from './api.js'
export default function Login(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * params
        this.loginModal = false
        this.userModel = {
            account: '',
            nickname: '',
            password: '',
        }
        // * function
        this.iAmLogined = iAmLogined
        this.postLogin = postLogin
        this.initUserInfo = initUserInfo
        this.clearLocalUserInfo = clearLocalUserInfo
        // *
        sourceFunction.apply(this, arguments)
    }
}

// 判断是否登录，如果没有登录则唤起登录框
function iAmLogined() {
    let token = localStorage['token-qqlx'] || null
    if (!token) this.loginModal = true
    return token
}

// 登录
async function postLogin() {
    try {
        if (!this.userModel.account) throw new Error('账号不能为空')
        if (!this.userModel.password) throw new Error('密码不能为空')
        let info = await alfredUserLogin(this.userModel)
        localStorage['token-qqlx'] = info.authorization
        $store.commit('setUserInfo', info)
        $tip('登录成功')
        this.loginModal = false
    } catch (error) {
        $common.loadOff(error)
    }
}

// 初始化用户信息
async function initUserInfo() {
    $store.commit('clearUserInfo')
    let info = await getUserInfo()
    $store.commit('setUserInfo', info)
}

function clearLocalUserInfo() {
    $store.commit('clearUserInfo')
    localStorage['token-qqlx'] = ''
}
