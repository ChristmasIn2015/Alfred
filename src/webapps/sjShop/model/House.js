// *
// *
export function HouseParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.houseModal = false
        this.houseList = []
        // *
        this.houseCreateModal = false
        this.houseCreateName = ''
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { getHouseList, createHouse } from './api.js'
export function HouseFunc(TargetClass) {
    TargetClass.prototype.toggleHouseModal = toggleHouseModal
    TargetClass.prototype.renderHouseList = renderHouseList
    TargetClass.prototype.createMyHouse = createMyHouse
}
async function toggleHouseModal() {
    if (!this.houseModal) this.renderHouseList() // @House
    this.houseModal = !this.houseModal
}
async function renderHouseList() {
    try {
        $load.show()
        let shopId = $store.state.shopInfo._id
        let data = await getHouseList(shopId)
        this.houseList = Object.assign([], data)
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
async function createMyHouse() {
    try {
        $load.show()
        let shopId = $store.state.shopInfo._id
        if (!shopId) throw new Error('请选择店铺')
        if (!this.houseCreateName) throw new Error('请输入仓库名称')
        await createHouse(shopId, this.houseCreateName)
        let data = await getHouseList(shopId)
        this.houseList = Object.assign([], data)
        this.toggleHouseModal() // @House
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
