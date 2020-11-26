import Tag from '@/webapps/sjShop/module/Tag.js'
import Good from '@/webapps/sjShop/module/Good.js'
import GoodFilter from './GoodFilter.js'

export default class React {
    constructor() {
        this.goodEdit = false
        this.initReact()
    }
    //
    @Tag
    @Good
    @GoodFilter
    async initReact() {
        try {
            // @Tag
            // this.plugTagModal = false
            // this.plugTagEditButton = false
            await this.renderTagList() // @Tag
            // // @Good
            // this.goodModal = false
            // this.countTagModal = false
            await this.renderGoodList() // @Good
            this.renderGoodNameList() // GoodFilter
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 展开商品弹窗
    toggleGoodModal(good = null) {
        try {
            this.goodModal = !this.goodModal // @Good
            if (this.goodModal) this.initGoodModel(good) // @Good
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 展开规格列表
    toggleTagModal() {
        try {
            this.tagModal = !this.tagModal // @Tag
            // if (this.plugTagModal) {
            //     $warn('请为商品选择规格')
            //     let plugListChecked = this.goodModel.plugList // @Good
            //     this.renderPlugTagList(plugListChecked) // @Tag
            // }
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 规格列表 点击确定
    tagModalOk() {
        this.initGoodModel({
            _id: this.goodModel._id,
            name: this.goodModel.name,
            plugList: this.getTagListChecked(), // @Tag
            countList: this.goodModel.countList,
            cost: this.goodModel.cost,
            tip: this.goodModel.tip,
        }) // @Good
        this.toggleTagModal()
    }

    // * 商品弹窗 点击确定
    async goodModalOk() {
        try {
            await this.postGood() // @Good
            await this.renderGoodList() // @Good
            this.renderGoodNameList() // @GoodFilter
            this.toggleGoodModal()
        } catch (error) {
            $common.loadOff(error)
        }
    }
}
