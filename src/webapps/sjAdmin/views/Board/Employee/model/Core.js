// *
// *
export function CoreParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        this.newEmployeeName = ''
        this.newEmployeePhone = ''
        this.employeeList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { createEmployee, getEmployeeList, deleteEmployee } from '@/webapps/sjAdmin/views/api.js'
export function CoreFunc(TargetClass) {
    TargetClass.prototype.addMyEmployee = addMyEmployee
    TargetClass.prototype.deleteMyEmployee = deleteMyEmployee
    TargetClass.prototype.getMyEmployeeList = getMyEmployeeList
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
        $common.loadToastWarn(error)
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
        $common.loadToastWarn(error)
    }
}
// * 取得员工列表
async function getMyEmployeeList() {
    try {
        let shopInfo = window.$store.state.shopInfo
        let list = await getEmployeeList(shopInfo._id)
        this.employeeList = Object.assign([], list)
    } catch (error) {
        this.employeeList = []
        $common.loadToastWarn(error)
    }
}
