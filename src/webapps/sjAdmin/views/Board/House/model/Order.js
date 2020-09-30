// *
// *
export function OrderParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { createOrder } from '@/webapps/sjAdmin/views/api.js'
export function OrderFunc(TargetClass) {
    TargetClass.prototype.createMyOrder = createMyOrder
}
async function createMyOrder(params) {
    try {
        // 1.整理订单的表单数据
        let list = []
        params.forEach((good) => {
            list.push({
                goodName: good.name,
                price: good.price,
                plugList: good.plugList,
                countList: good.countList,
            })
        })
        // 2.创建订单
        let houseInfo = $store.state.houseInfo
        await createOrder(houseInfo._id, list)
        this.getMyGoodList() // @Good
        $confirm({ title: '提示', content: '创建订单成功！' })
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
