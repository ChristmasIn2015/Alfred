const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class QtShop_Employee {
    constructor() {}

    // @AlfredLogin()
    // @Response('添加雇员成功')
    // async addEmployee(request, response) {
    //     // 1.
    //     let user = await Cabin.userCharge(request, response)

    //     // 2.希望加入店铺的员工必须已注册
    //     let userDoc = await global['$db'].User.get({ phone: request.body.phone })
    //     if (!userDoc) throw new Error('员工未注册')

    //     // 3.店铺必须存在
    //     let shopDoc = await global['$db'].Shop.get({ _id: request.body.shopId })
    //     if (!shopDoc) throw new Error('店铺不存在')

    //     // 4.员工必须未加入
    //     let employeeDoc = await global['$db'].Employee.get({ shopId: shopDoc._id, userId: userDoc._id })
    //     if (employeeDoc) throw new Error('该员工已加入您的店铺')

    //     // 5.只有店长能添加员工
    //     employeeDoc = await global['$db'].Employee.get({ shopId: shopDoc._id, userId: user._id })
    //     if (employeeDoc.role !== 0) throw new Error('您不是店长')

    //     // 6.更新店铺和用户之间的员工关系
    //     await global['$db'].Employee.create({ shopId: shopDoc._id, userId: userDoc._id, role: 1 })
    // }

    @AlfredLogin()
    @Response('获取雇员列表成功')
    async getEmployeeList(request, response) {
        const shopId = request.body.shopId
        let shop = await global['$db'].Shop.get({ _id: shopId })
        if (!shop) throw new Error('请选择店铺, 或该店铺不存在')

        // 1.找到店铺和用户存在关系的用户ID
        let ids = await global['$db'].ShopByUser.query({ shopId })
        ids.forEach((e) => (e['_id'] = e.userId))

        // 2.询问Alfred并返回用户列表
        const IPv4 = global['$common'].getIPv4()
        const info = await global['$common'].fetch(
            `http://${IPv4}:80/alfred/user/listById`,
            'POST',
            { ids }, // shopId userId role
            {
                authorization: request.header('authorization'),
            }
        )
        if (info.code !== 200) throw new Error(info.message)

        return info.data // shopId userId role nickname account
    }
}
