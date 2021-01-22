import Response from '../../../../database/Response.js'
const jwt = require('jsonwebtoken')
const md5 = require('js-md5')

export default class User {
    constructor() {
        this.jwtKey = 'Wqao'
    }
    #getModel() {
        return {
            name: '',
            phone: '',
            password: '',
            authorization: '',
            //
            shopIds: [],
            officeIds: [],
        }
    }

    async userCharge(request, response) {
        // 1.找到这个手机号对应的用户
        if (!request.header('authorization')) throw new Error('获取用户信息失败, 请重新登录')
        let userPhone = this.#getTokenInfo(request.header('authorization')).phone
        let user = await $db.User.get({ phone: userPhone })
        if (!user) throw new Error('获取用户信息失败, 请重新登录')
        return user
    }

    @Response('登录成功')
    async login(request, response) {
        // * 准备参数
        let userModel = this.#getModel()
        userModel.name = request.body.name
        userModel.phone = request.body.phone
        userModel.password = md5(request.body.password).toUpperCase()

        // 1.获取符合信息的用户
        let userQueryKey = {
            phone: userModel.phone,
        }
        let user = await $db.User.get(userQueryKey)

        // 2.如果用户不存在则新增用户
        if (!user) user = await $db.User.create(Object.assign({}, userModel))

        // 3.为这个用户验证密码
        if (userModel.password !== user.password) throw new Error('密码不正确')

        // 4.更新数据库中的Token
        let myToken = this.#createToken(userQueryKey)
        let updateModel = { authorization: myToken }
        if (userModel.name) updateModel = Object.assign(updateModel, { name: userModel.name })
        await $db.User.update(userQueryKey, updateModel) // User

        // 5.再次获取这个用户
        user = await $db.User.get(userQueryKey)

        // *
        return {
            _id: user._id,
            name: user.name,
            phone: user.phone,
            authorization: user.authorization,
        }
    }

    @Response()
    async getUserInfo(request, response) {
        // 1.找到这个手机号对应的用户
        if (!request.header('authorization')) throw new Error('获取用户信息失败, 请重新登录')
        let userPhone = this.#getTokenInfo(request.header('authorization')).phone
        let user = await $db.User.get({ phone: userPhone }) // User
        if (!user) throw new Error('获取用户信息失败')
        return {
            _id: user._id,
            name: user.name,
            phone: user.phone,
        }
    }

    // 生成一个Token
    #createToken(params) {
        let myToken = jwt.sign(params, this.jwtKey)
        return myToken
    }
    // 获取Token中的信息
    #getTokenInfo(token) {
        let info = jwt.verify(token, this.jwtKey)
        return info
    }
}
