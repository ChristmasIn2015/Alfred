export function ShopParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.shopModal = false
        this.shopList = []
        this.officeList = []
        // *
        this.shopCreateModal = false
        this.shopCreateName = ''
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
import { getShopList, createShop } from './api.js'
export function ShopFunc(TargetClass) {
    //
    TargetClass.prototype.toggleShopModal = toggleShopModal
    TargetClass.prototype.renderShopList = renderShopList
    TargetClass.prototype.createMyShop = createMyShop
}
// * 店铺
function toggleShopModal() {
    if (!this.shopModal) this.renderShopList() // @Shop
    this.shopModal = !this.shopModal
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
        $load.show()
        if (!this.shopCreateName) throw new Error('请输入店铺名称')
        await createShop(this.shopCreateName)
        let data = await getShopList()
        this.shopList = Object.assign([], data.shopList)
        this.toggleShopModal() // @Shop
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
