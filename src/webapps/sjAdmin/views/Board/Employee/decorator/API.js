export function ApiFunc(TargetClass) {
    // ======================================================= 员工
    TargetClass.prototype.createEmployee = createEmployee
    TargetClass.prototype.getEmployeeList = getEmployeeList
    TargetClass.prototype.deleteEmployee = deleteEmployee
}
// ======================================================= 员工
// * 店铺新增员工
function createEmployee(phone, shopId) {
    let params = { phone, shopId }
    console.log(params)
    return $common._Server.request('POST', '/sjShop/employee/create', params, $common.getLocalToken())
}
// * 店铺员工列表
function getEmployeeList(shopId) {
    let params = { shopId }
    return $common._Server.request('POST', '/sjShop/employee/list', params, $common.getLocalToken())
}
// * 店铺删除员工
function deleteEmployee(employeeId) {
    let params = { employeeId }
    return $common._Server.request('POST', '/sjShop/employee/delete', params, $common.getLocalToken())
}
