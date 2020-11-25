import { createEmployee, getEmployeeList, deleteEmployee } from './api.js'
export default function Employee(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.employeeTableColumn = [
            { title: 'Id', key: '_id', width: 130 },
            { title: '员工名称', key: 'name', width: 200 },
            { title: '员工手机号', key: 'phone', width: 200 },
            { title: '角色', key: 'roleName', width: 200 },
            { title: '操作', slot: 'action' },
        ]
        this.employeeList = []
        this.newEmployeeModal = false
        this.newEmployeePhone = ''
        //
        // * 方法
        this.addMyEmployee = addMyEmployee
        this.deleteMyEmployee = deleteMyEmployee
        this.renderEmployeeList = renderEmployeeList
        //
        sourceFunction.apply(this, arguments)
    }
}
// * 渲染员工列表
async function renderEmployeeList() {
    try {
        let shopId = $store.state.shopInfo._id
        let list = await getEmployeeList(shopId)
        list.forEach((e) => (e.role === 0 ? (e['roleName'] = '店长') : ''))
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
        let _id = $store.state.shopInfo._id
        await createEmployee(this.newEmployeePhone, _id)
        this.renderEmployeeList() // ASYNC
        $tip('添加员工成功')
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
        // return Promise.reject(error)
    }
}
// * 删除员工
async function deleteMyEmployee(id) {
    try {
        $load.show()
        await deleteEmployee(id)
        this.getMyEmployeeList($store.state.shopInfo._id) // ASYNC
        $tip('删除成功')
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
