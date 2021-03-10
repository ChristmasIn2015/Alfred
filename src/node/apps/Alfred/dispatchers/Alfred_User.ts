const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class Dispatcher_User {
    JWT = null
    JWT_KEY = 'wqao'
    MD5 = null
    constructor() {
        this.JWT = require('jsonwebtoken')
        this.MD5 = require('js-md5')
    }

    @Response('登录成功')
    async login(request, response) {
        // 1.根据账号(手机号)查询是否存在这个用户
        if (!request.body.account || request.body.account.length < 5) throw new Error('账号至少为5位')
        if (!request.body.password || request.body.password.length < 5) throw new Error('密码至少为5位')
        const account = String(request.body.account)
        const password = this.MD5(request.body.password).toUpperCase()
        let userQuery = { account }
        let user = await global['$db'].User.get(userQuery)
        if (!user) {
            // 2.如果用户不存在则新增用户
            user = await global['$db'].User.create({
                nickname: request.body.nickname,
                account,
                password,
            })
        } else {
            // 3.如果用户存在为则这个用户验证密码
            if (password !== user.password) throw new Error('您输入的密码不正确')
        }

        // 4.更新数据库中的Token
        const now = Date.now()
        const sign = { account, authoTime: now }
        await global['$db'].User.update(userQuery, {
            authoTime: now,
            authorization: this.JWT.sign(sign, this.JWT_KEY),
        })

        // 5.再次获取这个用户
        user = await global['$db'].User.get(userQuery)

        // *
        return {
            _id: user._id,
            nickname: user.nickname,
            account: user.account,
            authorization: user.authorization,
        }
    }

    @Response('获取用户信息成功')
    async getUserInfo(request, response) {
        // 1.获取用户信息 必须带有Token (account authoTime)
        const authorization = request.header('authorization')
        if (!authorization) throw new Error('获取用户信息失败, 请重新登录')

        // 2.查询并返回用户信息
        const account = this.JWT.verify(authorization, this.JWT_KEY).account
        let user = await global['$db'].User.get({ account })
        if (!user) throw new Error(`用户不存在:${account}`)
        return {
            _id: user._id,
            nickname: user.nickname,
            account: user.account,
        }
    }

    @AlfredLogin()
    @Response('获取用户列表成功')
    async getUserList(request, response) {
        let list = await global['$db'].User.query({})
        return list
            .map((e) => {
                return {
                    _id: e._id,
                    nickname: e.nickname,
                    account: e.account,
                    timeCreateChinese: global['$common'].getFullTime(e.timeCreate).full,
                    timeUpdateChinese: global['$common'].getFullTime(e.timeUpdate).full,
                }
            })
            .reverse()
    }

    // 某些服务需要批量获取用户信息
    @AlfredLogin()
    @Response('获取指定用户成功')
    async getUserListById(request, response) {
        const ids = request.body.ids
        let userList = []
        for (let i in ids) {
            let user = await global['$db'].User.get({ _id: ids[i]._id })
            if (user) {
                ids[i]['nickname'] = user.nickname
                ids[i]['account'] = user.account
                userList.push(ids[i])
            }
        }
        return userList
    }
}
