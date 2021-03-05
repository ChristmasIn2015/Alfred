import { getHouseList, createHouse } from '@/web/apps/QtShop/module/api.js'
export default function HouseCenter(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.houseModel = {
            _id: null,
            name: '',
        }
        this.houseModal = false
        this.houseList = []
        //
        // * 方法
        this.toggleHouseModal = toggleHouseModal
        this.renderHouseList = renderHouseList
        this.actionHouse = actionHouse
        this.pickHouse = pickHouse
        //
        sourceFunction.apply(this, arguments)
    }
}
//
function toggleHouseModal(event) {
    this.houseModal = !this.houseModal
}
// 渲染仓库列表
async function renderHouseList() {
    const now = Date.now()
    $load.show()
    let shopId = $store.state.shopInfo._id
    if (!shopId) throw new Error('请选择店铺')
    let data = await getHouseList(shopId)
    this.houseList = Object.assign([], data)
    this.houseModal = false
    $load.hide()
    console.log('renderHouseList time', Date.now() - now)
}
// * 创建仓库
async function actionHouse() {
    try {
        if (!this.iAmLogined()) return
        $load.show()
        let shopId = $store.state.shopInfo._id
        if (!shopId) throw new Error('请选择店铺')
        if (!this.houseModel.name) throw new Error('请输入仓库名称')
        await createHouse({ shopId, name: this.houseModel.name })
        await this.renderHouseList()
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
// 选择仓库
async function pickHouse(event, target) {
    try {
        if (target.picked) return
        this.houseList.forEach((e) => (e['picked'] = false))
        // target 指针
        target.picked = true
        $store.commit('setHouseInfo', target)
        //
        this.houseList = Object.assign([], this.houseList)
    } catch (error) {
        $common.loadOff(error)
        $store.commit('clearShopInfo', target)
        $store.commit('clearHouseInfo', target)
    }
}
