import { GoodParams, GoodFunc } from '../../model/Good.js'
import { TagParams, TagFunc } from '../../model/Tag.js'

@TagFunc
@GoodFunc
export default class Model {
    constructor() {
        this.init()
    }
    // *
    @TagParams
    @GoodParams
    init() {
        this.goodEditModal = false
        this.plugTagModal = false
        this.plugTagEditButton = false
        this.countTagModal = false
        this.renderGoodList() // @Good
    }

    // * 商品弹窗
    // ** 点击新增商品 展开商品弹窗
    toggleGoodEditModal(good = null) {
        this.goodEditModal = !this.goodEditModal
        if (this.goodEditModal) this.initGoodModel(good) // @Good
    }
    // ** 商品弹窗 点击确定
    async goodEditModalConfirm() {
        try {
            await this.postGood() // @Good
            await this.renderGoodList() // @Good
            this.toggleGoodEditModal() // @React
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 规格列表
    // ** 点击编辑规格 展开规格列表
    togglePlugTagModal() {
        this.plugTagModal = !this.plugTagModal
        if (this.plugTagModal) {
            $warn('请为商品选择规格')
            let plugListChecked = this.goodModel.plugList // @Good
            this.renderPlugTagList(plugListChecked) // @Tag
        }
    }
    // ** 规格列表 点击确定
    plugModalConfirm() {
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
}
