import Tag from '@/webapps/sjShop/module/Tag.js'
import Good from '@/webapps/sjShop/module/Good.js'
import GoodFilter from '@/webapps/sjShop/module/GoodFilter.js'

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
            await this.renderTagList() // @Tag
            await this.renderGoodList() // @Good
            this.renderGoodNameList() // GoodFilter
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 展开商品弹窗
    toggleGoodModal(good = null) {
        this.goodModal = !this.goodModal // @Good
        if (this.goodModal) this.initGoodModel(good) // @Good
    }

    // * 展开规格列表
    async toggleTagModal() {
        try {
            await this.renderTagList(this.goodModel.plugList) // @Tag
            this.tagEdit = false // @Tag
            this.tagModal = !this.tagModal // @Tag
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
