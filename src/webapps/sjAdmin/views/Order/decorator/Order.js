export function OrderParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        this.goodList = []
        this.goodEditModel = {
            id: -1,
            name: '',
            plugList: [],
            countList: [],
            cost: '',
            tip: '',
        }
        // *
        sourceFunction.apply(this, arguments)
    }
}
export function OrderFunc(TargetClass) {
    TargetClass.prototype.getMyGoodList = getMyGoodList
    TargetClass.prototype.postMyOrder = postMyOrder
}
// * 获取某个仓库下所有商品
async function getMyGoodList() {
    try {
        let list = await this.getGoodList(window.$store.state.houseInfo._id) // @API
        this.goodList = Object.assign([], list.reverse())
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
// * 创建订单
async function postMyOrder() {
    try {
        let list = await this.getGoodList(window.$store.state.houseInfo._id) // @API
        this.goodList = Object.assign([], list.reverse())
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
