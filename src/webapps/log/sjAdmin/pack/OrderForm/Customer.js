// *
// *
export function CustomerParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.companyName = ''
        this.companyAddress = ''
        this.contact = ''
        // *
        this.customerList = []
        this.customerModal = false
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { createCustomer, getCustomerList } from '../api.js'
export function CustomerFunc(TargetClass) {
    // *
    TargetClass.prototype.toggleCustomerModal = toggleCustomerModal
    TargetClass.prototype.addCustomer = addCustomer
    TargetClass.prototype.renderCustomerList = renderCustomerList
    TargetClass.prototype.pickCustomer = pickCustomer
}
function pickCustomer(index) {
    let target = this.customerList[index]
    if (!target) return
    this.companyName = target.companyName
    this.companyAddress = target.companyAddress
    this.contact = target.contact
    this.toggleCustomerModal()
}
function toggleCustomerModal() {
    this.customerModal = !this.customerModal
    if (this.customerModal) this.renderCustomerList() // @Customer
}
async function addCustomer() {
    try {
        $load.show()
        await createCustomer(this.companyName, this.companyAddress, this.contact)
        $load.hide()
        this.renderCustomerList() // @Customer
        $tip('添加客户成功')
    } catch (error) {
        $common.loadOff(error)
    }
}
async function renderCustomerList() {
    try {
        $load.show()
        let list = await getCustomerList()
        this.customerList = Object.assign([], list.reverse())
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
