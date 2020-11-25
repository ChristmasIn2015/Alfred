// *
// *
export function OrderParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.goodListPicked = new Array(6).fill({})
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
export function OrderFunc(TargetClass) {
    TargetClass.prototype.pickGoodInForm = pickGoodInForm
    TargetClass.prototype.deleteGoodPicked = deleteGoodPicked
}
// * 填单页选择一个商品
function pickGoodInForm(good) {
    for (let i = 0; i < this.goodListPicked.length; i++) {
        let orderGood = this.goodListPicked[i]
        if (orderGood._id === good._id) {
            $tip('该商品已在单据中')
            break
        }
        if (!orderGood._id) {
            this.goodListPicked[i] = good
            break
        }
    }
    this.goodListPicked = Object.assign([], this.goodListPicked)
    this.toggleGoodEditModal() // @good
}
function deleteGoodPicked(index) {
    let target = this.goodListPicked[index]
    if (target) this.goodListPicked[index] = {}
    this.goodListPicked = Object.assign([], this.goodListPicked)
}
