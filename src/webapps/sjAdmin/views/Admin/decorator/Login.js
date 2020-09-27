export function LoginParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 侧边栏控制
        this.modalLoginShow = false
        this.userPhone = ''
        this.userPassword = ''
        // *
        sourceFunction.apply(this, arguments)
    }
}
export function LoginFunc(TargetClass) {
    // *
    TargetClass.prototype.initUserInfo = initUserInfo
    TargetClass.prototype.postLogin = postLogin
    TargetClass.prototype.reLogin = reLogin
    TargetClass.prototype.iAmLogined = iAmLogined
}
// * 初始化用户信息
async function initUserInfo() {
    try {
        $load.show()
        let info = await this.getUserInfo()
        window.$store.state.userInfo.name = info.name
        window.$store.state.userInfo.phone = info.phone
        $tip('登录成功')
        this.modalLoginShow = false
        $load.hide()
    } catch (error) {
        window.$store.commit('clearUserInfo')
        window.$store.commit('clearShopInfo')
        window.$store.commit('clearHouseInfo')
        $common.loadToastWarn(error)
    }
}
// * 登录
async function postLogin() {
    try {
        $load.show()
        let info = await this.shopUserLogin('', this.userPhone, this.userPassword)
        localStorage['sjShopToken'] = info.authorization
        window.$store.state.userInfo.name = info.name
        window.$store.state.userInfo.phone = info.phone
        $tip('登录成功')
        $load.hide()
        this.modalLoginShow = false
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
// * 注销登录
function reLogin() {
    if (this.iAmLogined()) {
        $confirm({ title: '注销', content: '您确定要注销登录吗' }, (response) => {
            if (!response) return
            window.$store.commit('clearUserInfo')
            window.$store.commit('clearShopInfo')
            window.$store.commit('clearHouseInfo')
            this.sideIndex = -1
        })
    }
}
// * 判断是否，如果没有登录则唤起登录框
function iAmLogined() {
    let iAmLogined = localStorage['sjShopToken'] ? true : false
    if (!iAmLogined) {
        $tip('尚未登录')
        this.modalLoginShow = true
    }
    return iAmLogined
}
