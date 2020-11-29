import Employee from '@/webapps/sjShop/module/Employee.js'

export default class React {
    constructor() {
        this.employeeTableColumn = [
            { title: 'Id', key: '_id', width: 130 },
            { title: '员工名称', key: 'name', width: 200 },
            { title: '员工手机号', key: 'phone', width: 200 },
            { title: '角色', key: 'roleName', width: 200 },
            { title: '操作', slot: 'action' },
        ]
        this.initReact()
    }
    // *
    @Employee
    @$common.TryCatch
    async initReact() {
        await this.renderEmployeeList() // @Employee
    }
}
