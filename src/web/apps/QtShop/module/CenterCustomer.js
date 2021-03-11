import { createCustomer, getCustomerList } from '@/web/apps/QtShop/module/api.js'
export default function CenterCustomer(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        //
        // * 参数
        this.customerModal = false
        this.customerModel = {
            name: '',
            contact: '',
            remark: '',
        }
        this.customerList = []
        //
        // * 方法
        this.renderCustomerList = renderCustomerList
        this.actionCustomer = actionCustomer
        // *
        sourceFunction.apply(this, arguments)
    }
}

async function renderCustomerList() {
    const shopId = $store.state.shopInfo._id
    if (!shopId) throw new Error('请选择店铺')
    let list = await getCustomerList(shopId)
    this.customerList = Object.assign(
        [],
        list.reverse().map((e) => (e['picked'] = false))
    )
}
async function actionCustomer() {
    try {
        $load.show()
        const shopId = $store.state.shopInfo._id
        if (!shopId) throw new Error('请选择店铺')
        let DTO = Object.assign({ shopId }, this.customerModel)
        await createCustomer(DTO)
        await this.renderCustomerList() // @Customer
        $tip('添加客户成功')
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
