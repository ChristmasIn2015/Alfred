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
        this.customerModelList = []
        this.customerList = []
        //
        // * 方法
        this.toggleCustomerList = toggleCustomerList
        this.renderCustomerList = renderCustomerList
        this.actionCustomer = actionCustomer
        // *
        sourceFunction.apply(this, arguments)
    }
}
async function toggleCustomerList() {
    try {
        this.customerModal = !this.customerModal
        if (this.customerModal) {
            if (this.customerModelList.length === 0) {
                this.customerModelList = [Object.assign({}, this.customerModel)]
            }
            await this.renderCustomerList()
        }
    } catch (error) {
        $common.loadOff(error)
        if (error.message === '请选择店铺') {
            $load.show()
            setTimeout(() => {
                $router.push({ path: '/hall/center' })
                $load.hide()
            }, 1000)
        }
    }
}

// 渲染
async function renderCustomerList() {
    const shopId = $store.state.shopInfo._id
    if (!shopId) throw new Error('请选择店铺')
    let list = await getCustomerList(shopId)
    this.customerList = Object.assign([], list.reverse())
}

// 响应
async function actionCustomer() {
    try {
        $load.show()
        const shopId = $store.state.shopInfo._id
        if (!shopId) throw new Error('请选择店铺')
        let DTO = Object.assign({ shopId }, this.customerModelList[0])
        await createCustomer(DTO)
        await this.renderCustomerList()
        $tip('添加客户成功')
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
        if (error.message === '请选择店铺') {
            $load.show()
            setTimeout(() => {
                $router.push({ path: '/hall/center' })
                $load.hide()
            }, 1000)
        }
    }
}
