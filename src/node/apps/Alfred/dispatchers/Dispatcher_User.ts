const Response = global['$common'].Response
export default class Dispatcher_User {
    jwt = null
    jwtKey = 'wqao'
    md5 = null
    constructor() {
        this.jwt = require('jsonwebtoken')
        this.md5 = require('js-md5')
    }

    // // 用于其他
    // async userCharge(request, response) {
    //     // 1.找到这个手机号对应的用户
    //     if (!request.header('authorization')) throw new Error('获取用户信息失败, 请重新登录')
    //     let userPhone = this.#getTokenInfo(request.header('authorization')).phone
    //     let user = await $db.User.get({ phone: userPhone })
    //     if (!user) throw new Error('获取用户信息失败, 请重新登录')
    //     return user
    // }
}
