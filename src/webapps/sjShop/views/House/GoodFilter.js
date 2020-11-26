export default function GoodFilter(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.goodNameList = []
        // * 方法
        this.renderGoodNameList = renderGoodNameList
        //
        sourceFunction.apply(this, arguments)
    }
}
// goodList 去重
function renderGoodNameList() {
    let mySet = new Set()
    this.goodList.forEach((e) => mySet.add(e.name))
    this.goodNameList = Array.from(mySet)
}
