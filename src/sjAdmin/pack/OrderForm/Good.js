// *
// *
export function GoodParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.goodModal = false
        // *
        this.goodList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { getGoodList } from '../api.js'
export function GoodFunc(TargetClass) {
    TargetClass.prototype.getMyGoodList = getMyGoodList
    TargetClass.prototype.toggleGoodModal = toggleGoodModal
}
// * 开单展开商品列表
function toggleGoodModal() {
    this.goodModal = !this.goodModal
    if (this.goodModal) {
        this.getMyGoodList() // @Good
    }
}
// * 获取某个仓库下所有商品
async function getMyGoodList() {
    try {
        let list = await getGoodList(window.$store.state.houseInfo._id)
        // *
        list.forEach((e) => this.goodListPicked.forEach((p) => (e._id === p._id ? (e['inOrder'] = true) : '')))
        console.log(list)
        // *
        this.goodSourceList = Object.assign([], list.reverse()) // @Filter
        this.goodList = JSON.parse(JSON.stringify(this.goodSourceList))

        // *
        this.initFilterParams() // @Filter
    } catch (error) {
        $common.loadOff(error)
    }
}
