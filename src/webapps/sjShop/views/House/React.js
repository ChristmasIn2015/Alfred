import Good from '@/webapps/sjShop/module/Good.js'
import Tag from '@/webapps/sjShop/module/Tag.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @Tag
    @Good
    async initReact() {
        try {
            // @Tag
            // this.plugTagModal = false
            // this.plugTagEditButton = false
            // await this.renderPlugTagList()
            // // @Good
            // this.goodModal = false
            // this.countTagModal = false
            await this.renderGoodList()
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 展开商品弹窗
    toggleGoodModal(good = null) {
        try {
            this.goodModal = !this.goodModal
            // if (this.goodModal) this.initGoodModel(good) // @Good
        } catch (error) {
            $common.loadOff(error)
        }
    }
    // ** 商品弹窗 点击确定
    async goodEditModalConfirm() {
        try {
            await this.postGood() // @Good
            await this.renderGoodList() // @Good
            this.toggleGoodModal() // @React
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 规格列表
    // ** 点击编辑规格 展开规格列表
    togglePlugTagModal() {
        try {
            this.plugTagModal = !this.plugTagModal
            if (this.plugTagModal) {
                $warn('请为商品选择规格')
                let plugListChecked = this.goodModel.plugList // @Good
                this.renderPlugTagList(plugListChecked) // @Tag
            }
        } catch (error) {
            $common.loadOff(error)
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
