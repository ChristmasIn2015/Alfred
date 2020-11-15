export function ReactParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.goodEditModal = false
        this.plugTagModal = false
        this.countTagModal = false
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// import { getShopList, createShop } from '../api.js'
export function ReactFunc(TargetClass) {
    TargetClass.prototype.toggleGoodEditModal = toggleGoodEditModal
    TargetClass.prototype.goodEditModalConfirm = goodEditModalConfirm
    //
    TargetClass.prototype.togglePlugTagModal = togglePlugTagModal
    TargetClass.prototype.plugModalConfirm = plugModalConfirm
}
// * 展开商品编辑的表单
function toggleGoodEditModal() {
    this.goodEditModal = !this.goodEditModal
    if (this.goodEditModal) this.initGoodModel() // @Good
}
// * 展开规格列表
function togglePlugTagModal() {
    this.plugTagModal = !this.plugTagModal
    if (this.plugTagModal) {
        $warn('请为商品选择规格')
        let plugListChecked = this.goodModel.plugList // @Good
        this.renderPlugTagList(plugListChecked) // @Tag
    }
}
// * 规格列表的Modal点击确定
function plugModalConfirm() {
    let info = this.getTagModalInfo() // @Tag
    // @Good
    this.initGoodModel({
        _id: this.goodModel._id,
        name: this.goodModel.name,
        plugList: info.plugTagList,
        countList: this.goodModel.countList,
        cost: this.goodModel.cost,
        tip: this.goodModel.tip,
    })
    this.togglePlugTagModal() // @React
}
// * 商品编辑的表单点击确定
async function goodEditModalConfirm() {
    try {
        await this.postGood() // @Good
        await this.renderGoodList() // @Good
        this.toggleGoodEditModal() // @React
    } catch (error) {
        $common.loadOff(error)
    }
}
