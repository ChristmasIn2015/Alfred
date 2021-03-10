import { getEmployeeList } from '@/web/apps/QtShop/module/api.js'
export default function CenterEmployee(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.employeeList = []
        // this.newEmployeeModal = false
        // this.newEmployeePhone = ''
        //
        // * 方法
        // this.addMyEmployee = addMyEmployee
        this.renderEmployeeList = renderEmployeeList
        // this.deleteMyEmployee = deleteMyEmployee
        //
        sourceFunction.apply(this, arguments)
    }
}
// 渲染员工列表
async function renderEmployeeList(shopId) {
    let list = await getEmployeeList(shopId)
    list.forEach((e) => (e.role === 0 ? (e['roleName'] = '店长') : ''))
    this.employeeList = Object.assign([], list)
}
// 添加员工
// async function addMyEmployee() {
//     try {
//         $load.show()
//         let _id = $store.state.shopInfo._id
//         await createEmployee(this.newEmployeePhone, _id)
//         await this.renderEmployeeList() // ASYNC
//         $tip('添加员工成功')
//         $load.hide()
//     } catch (error) {
//         $common.loadOff(error)
//     }
// }
// 删除员工
// async function deleteMyEmployee(id) {
//     try {
//         $load.show()
//         await deleteEmployee(id)
//         await this.renderEmployeeList()
//         $tip('删除成功')
//         $load.hide()
//     } catch (error) {
//         $common.loadOff(error)
//     }
// }
