// *
// *
export function OrderParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.orderList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { getOrderList } from '@/webapps/sjAdmin/views/api.js'
export function OrderFunc(TargetClass) {
    TargetClass.prototype.getMyOrderList = getMyOrderList
}
async function getMyOrderList() {
    try {
        let houseInfo = $store.state.houseInfo
        let list = await getOrderList(houseInfo._id)
        this.orderList = Object.assign([], list.reverse())
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
