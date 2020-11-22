// *
// *
export function EmployeeParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        //
        this.newEmployeeName = ''
        this.newEmployeePhone = ''
        //
        this.employeeTableColumn = [
            { title: 'Id', key: '_id', width: 130 },
            { title: '员工名称', key: 'name', width: 200 },
            { title: '员工手机号', key: 'phone', width: 200 },
            { title: '角色', key: 'roleName', width: 200 },
            { title: '操作', slot: 'action' },
        ]
        this.employeeList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { createEmployee, getEmployeeList, deleteEmployee } from './api.js'
export function EmployeeFunc(TargetClass) {
    TargetClass.prototype.addMyEmployee = addMyEmployee
    TargetClass.prototype.deleteMyEmployee = deleteMyEmployee
    TargetClass.prototype.renderEmployeeList = renderEmployeeList
}
// * 取得员工列表
async function renderEmployeeList() {
    try {
        let shopId = $store.state.shopInfo._id
        let list = await getEmployeeList(shopId)
        list.forEach((e) => {
            if (e.role === 0) e['roleName'] = '店长'
        })
        this.employeeList = Object.assign([], list)
    } catch (error) {
        this.employeeList = []
        return Promise.reject(error)
    }
}
// * 添加员工
async function addMyEmployee() {
    try {
        $load.show()
        let shopInfo = window.$store.state.shopInfo
        await createEmployee(this.newEmployeePhone, shopInfo._id)
        this.getMyEmployeeList(shopInfo._id) // ASYNC
        $tip('添加员工成功')
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 删除员工
async function deleteMyEmployee(id) {
    try {
        $load.show()
        await deleteEmployee(id)
        let shopInfo = window.$store.state.shopInfo
        this.getMyEmployeeList(shopInfo._id) // ASYNC
        $tip('删除成功')
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}