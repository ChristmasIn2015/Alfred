// *
// *
export function CustomerParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.goodList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { createCustomer, getCustomerList } from '@/webapps/sjAdmin/views/api.js'
export function CustomerFunc(TargetClass) {
    // *
    // TargetClass.prototype.toggleCustomerModal = toggleCustomerModal
}
