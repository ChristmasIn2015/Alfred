import { getShopList, createShop } from './api.js'
export default function Shop(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.shopCreateName = ''
        this.shopModal = false
        this.shopList = []
        this.officeList = []
        //
        // * 方法
        this.renderShopList = renderShopList
        this.createMyShop = createMyShop
        // *
        sourceFunction.apply(this, arguments)
    }
}
// * 渲染店铺列表
async function renderShopList() {
    try {
        $load.show()
        let data = await getShopList()
        this.shopList = Object.assign([], data.shopList)
        this.officeList = Object.assign([], data.officeList)
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 创建店铺
async function createMyShop() {
    try {
        if (!this.iAmLogined()) return
        $load.show()
        if (!this.shopCreateName) throw new Error('请输入店铺名称')
        await createShop(this.shopCreateName)
        let data = await getShopList()
        this.shopList = Object.assign([], data.shopList)
        this.shopModal = false
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
