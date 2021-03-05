import { getShopList, createShop } from '@/web/apps/QtShop/module/api.js'
export default function Shop(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.shopModel = {
            _id: null,
            name: '',
        }
        this.shopModal = false
        this.shopList = []
        this.officeList = []
        //
        // * 方法
        this.toggleShopModal = toggleShopModal
        this.renderShopList = renderShopList
        this.actionShop = actionShop
        this.pickShop = pickShop
        // *
        sourceFunction.apply(this, arguments)
    }
}
//
function toggleShopModal(event) {
    this.shopModal = !this.shopModal
}
// * 渲染店铺列表
async function renderShopList() {
    $load.show()
    let data = await getShopList()
    this.shopList = Object.assign(
        [],
        data.shopList.map((e) => {
            e['picked'] = false
            return e
        })
    )
    this.officeList = Object.assign(
        [],
        data.officeList.map((e) => {
            e['picked'] = false
            return e
        })
    )
    this.shopModal = false
    $store.commit('clearShopInfo')
    $load.hide()
}
// * 创建店铺
async function actionShop() {
    try {
        if (!this.iAmLogined()) return
        if (!this.shopModel.name) throw new Error('请输入店铺名称')
        $load.show()
        await createShop(this.shopModel)
        await this.renderShopList()
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
// 选择店铺
async function pickShop(event, target) {
    try {
        if (target.picked) return
        this.shopList.forEach((e) => (e['picked'] = false))
        this.officeList.forEach((e) => (e['picked'] = false))
        // target 指针
        target.picked = true
        $store.commit('setShopInfo', target)
        $store.commit('clearHouseInfo', target)
        //
        this.shopList = Object.assign([], this.shopList)
        this.officeList = Object.assign([], this.officeList)
        //
        await this.renderHouseList(target._id) // @HouseCenter
    } catch (error) {
        $common.loadOff(error)
        $store.commit('clearShopInfo', target)
        $store.commit('clearHouseInfo', target)
    }
}
