import Response from '../../../../database/Response.js'
export default class Employee {
    constructor() {}

    @Response('添加员工成功')
    async addEmployee(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.希望加入店铺的员工必须已注册
        let userDoc = await $db.User.get({ phone: request.body.phone })
        if (!userDoc) throw new Error('员工未注册')

        // 3.店铺必须存在
        let shopDoc = await $db.Shop.get({ _id: request.body.shopId })
        if (!shopDoc) throw new Error('店铺不存在')

        // 4.员工必须未加入
        let employeeDoc = await $db.Employee.get({ shopId: shopDoc._id, userId: userDoc._id })
        if (employeeDoc) throw new Error('该员工已加入您的店铺')

        // 5.只有店长能添加员工
        employeeDoc = await $db.Employee.get({ shopId: shopDoc._id, userId: user._id })
        if (employeeDoc.role !== 0) throw new Error('您不是店长')

        // 6.更新店铺和用户之间的员工关系
        await $db.Employee.create({ shopId: shopDoc._id, userId: userDoc._id, role: 1 })
    }

    //
    @Response()
    async getEmployeeList(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.找到这个店铺
        let shopDoc = await $db.Shop.get({ _id: request.body.shopId })
        if (!shopDoc) throw new Error('店铺不存在')

        // 2.找到这个店铺 和用户关系为1的所有用户
        let employees = await $db.Employee.query({ shopId: shopDoc._id })
        let list = []
        for (let i = 0; i < employees.length; i++) {
            let user = await $db.User.get({ _id: employees[i].userId })
            if (user) list.push(Object.assign({ role: employees[i].role }, user))
        }
        return list
    }

    //
    // @Response()
    // async deleteEmployee(request, response, ) {
    //     // 1.
    //     let user = await Cabin.userCharge(request, response, )

    //     // 2.取得需要删除的雇员
    //     let employee = await $db.Employee.get({ userId: request.body.employeeId, role: 1 }) // ShopEmployee
    //     if (!employee) throw new Error('要删除的员工不存在')

    //     // 2.请求者必须是这个店长
    //     let shopList = await $db.Shop.get({ _id: user._id }) // Shop
    //     if (!shopList.length) throw new Error('该雇员的店铺不存在')
    //     if (shopList[0].byUserId !== String(requestUser._id)) throw new Error('您不是店长')

    //     // 3.删除员工
    //     await this.deleteDocumentById(request.body.employeeId) // ShopEmployee
    //     myResult.code = 200
    //     myResult.message = '删除员工成功'
    // }
}
