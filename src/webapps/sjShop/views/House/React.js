import Tag from '@/webapps/sjShop/module/Tag.js'
import Good from '@/webapps/sjShop/module/Good.js'
import GoodFilter from '@/webapps/sjShop/module/GoodFilter.js'

export default class React {
    constructor() {
        this.goodEdit = false
        this.goodTableColumn = [
            { title: 'Id', key: '_id', width: 150 },
            { title: '名称', key: 'name', width: 120 },
            { title: '规格', slot: 'plugList', width: 200 },
            { title: '库存', slot: 'countList', width: 200 },
            { title: '成本', key: 'cost', width: 100 },
            { title: '备注', key: 'tip' },
            { title: '操作', slot: 'action', width: 200 },
            { title: '入库时间', key: 'timeString', width: 200 },
        ]
        this.initReact()
    }

    @Tag
    @Good
    @GoodFilter
    @$common.TryCatch
    async initReact() {
        await this.renderGoodList() // @Good
        this.renderGoodNameList() // @GoodFilter
    }

    // 展开商品弹窗
    toggleGoodModal(good = null) {
        this.goodModal = !this.goodModal // @Good
        this.initGoodModel(good) // @Good
    }

    // 展开规格列表
    @$common.TryCatch
    async toggleTagModal() {
        await this.renderTagList(this.goodModel.plugList) // @Tag
        this.tagEdit = false // @Tag
        this.tagModal = !this.tagModal // @Tag
    }

    // 规格列表 点击确定
    tagModalOk() {
        let model = this.goodModel
        model.plugList = this.getTagListChecked() // @Tag
        this.initGoodModel(model) // @Good
        this.toggleTagModal()
    }

    // 商品弹窗 点击确定
    @$common.TryCatch
    async goodModalOk() {
        await this.postGood() // @Good
        await this.renderGoodList() // @Good
        this.renderGoodNameList() // @GoodFilter
        this.toggleGoodModal()
    }

    // 清空筛选
    @$common.TryCatch
    async filterClear() {
        this.filterKey = '' // @GoodFilter
        await this.renderGoodList() // @Good
        this.renderGoodNameList() // @GoodFilter
    }
}
