import { getHouseList, createHouse } from './api.js'
export default function House(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.houseModal = false
        this.houseList = []
        this.houseCreateName = ''
        // * 方法
        this.renderHouseList = renderHouseList
        this.createMyHouse = createMyHouse
        //
        sourceFunction.apply(this, arguments)
    }
}
// * 渲染仓库列表
async function renderHouseList() {
    try {
        let shopId = $store.state.shopInfo._id
        if (!shopId) return
        $load.show()
        let data = await getHouseList(shopId)
        this.houseList = Object.assign([], data)
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 创建仓库
async function createMyHouse() {
    try {
        if (!this.iAmLogined()) return
        $load.show()
        let shopId = $store.state.shopInfo._id
        if (!shopId) throw new Error('请选择店铺')
        if (!this.houseCreateName) throw new Error('请输入仓库名称')
        await createHouse(shopId, this.houseCreateName)
        let data = await getHouseList(shopId)
        this.houseList = Object.assign([], data)
        this.houseModal = false
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
