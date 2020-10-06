// *
// *
export function FilterParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.goodNameList = []
        this.goodPlugList = []
        this.goodCheckedList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
// import { createOrder } from '@/webapps/sjAdmin/views/api.js'
export function FilterFunc(TargetClass) {
    TargetClass.prototype.initGoodFiltedList = initGoodFiltedList
}
function initGoodFiltedList() {
    // * 商品名称归类
    let tempMap = {}
    this.goodNameList = []
    this.goodList.forEach((e) => (tempMap[e.name] = true))
    for (let key in tempMap) {
        this.goodNameList.push(key)
    }

    // * 商品规格归类
    tempMap = {}
    this.goodPlugList = []
    this.goodList.forEach((e) => {
        e.plugList.forEach((plug) => {
            let name = plug.value + plug.name
            tempMap[name] = true
        })
    })
    for (let key in tempMap) {
        this.goodPlugList.push(key)
    }

    // * 选中的商品列表
    let list = []
    this.goodList.forEach((e) => (e.checked ? list.push(e) : ''))
    this.goodCheckedList = Object.assign([], list)
}
