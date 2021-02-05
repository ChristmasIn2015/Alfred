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
    let data = await getShopList()
    this.shopList = Object.assign([], data.shopList)
    this.officeList = Object.assign([], data.officeList)
}
// * 创建店铺
async function createMyShop() {
    try {
        if (!this.iAmLogined()) return
        if (!this.shopCreateName) throw new Error('请输入店铺名称')
        $load.show()
        await createShop(this.shopCreateName)
        let data = await getShopList()
        this.shopList = Object.assign([], data.shopList)
        this.shopModal = false
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
        return Promise.reject(error)
    }
}
