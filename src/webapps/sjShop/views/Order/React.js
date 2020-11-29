import Customer from '@/webapps/sjShop/module/Customer.js'
import Good from '@/webapps/sjShop/module/Good.js'
import GoodFilter from '@/webapps/sjShop/module/GoodFilter.js'
import Order from '@/webapps/sjShop/module/Order.js'
import Tag from '@/webapps/sjShop/module/Tag.js'

export default class React {
    constructor() {
        this.customerTableColumn = [
            { title: '公司', key: 'companyName' },
            { title: '地址', key: 'companyAddress' },
            { title: '联系人', key: 'contact' },
            { title: '操作', slot: 'action' },
        ]
        this.goodTableColumn = [
            { title: 'Id', key: '_id', width: 150 },
            { title: '名称', key: 'name', width: 120 },
            { title: '规格', slot: 'plugList', width: 200 },
            { title: '剩余库存', slot: 'countList', width: 200 },
            { title: '操作', slot: 'action' },
        ]
        this.orderGoodTableColumn = [
            { title: 'Id', key: '_id', width: 150 },
            { title: '名称', key: 'name', width: 120 },
            { title: '规格', slot: 'plugList', width: 200 },
            { title: '剩余库存', slot: 'countList', width: 200 },
            { title: '售出数量', slot: 'outCountList', width: 200 },
            { title: '售出单价', slot: 'orderGoodPrice', width: 200 },
            { title: '操作', slot: 'action' },
        ]
        this.orderListTableColumn = [
            { title: '订单Id', key: '_id', width: 150 },
            { title: '商品', slot: 'goodList' },
            { title: '总金额', key: 'orderPriceName', width: 100 },
            { title: '发货状态', key: 'goodStatusName', width: 100 },
            { title: '回款状态', key: 'priceStatusName', width: 100 },
            { title: '下单时间', key: 'timeString', width: 200 },
            { title: '操作', slot: 'action' },
        ]
        this.orderEditTableColumn = [
            { title: 'Id', key: '_id', width: 150 },
            { title: '名称', key: 'name', width: 120 },
            { title: '规格', slot: 'plugList', width: 200 },
            { title: '发出数量', slot: 'outCountList', width: 200 },
            { title: '发出价格', slot: 'price', width: 200 },
            { title: '操作', slot: 'action' },
        ]
        this.initReact()
    }

    @Tag
    @Good
    @GoodFilter
    @Customer
    @Order
    initReact() {}

    // ============================================================================================
    // 展开发货编辑
    toggleOrderEditModal(order) {
        this.orderEditTarget = JSON.parse(JSON.stringify(order))
        this.orderEdit = false
        this.orderEditModal = !this.orderEditModal
    }
    // 删除一个已发货的商品
    deleteOrderGood(index) {
        this.orderEditTarget.goodList.splice(index, 1)
    }
    // ============================================================================================
    // 创建订单
    @$common.TryCatch
    async postMyOrder() {
        await this.postOrder(this.customerPicked) // @Order
        this.goodListPicked = []
        this.toggleOrderListModal() // @React
    }
    // 展开订单列表
    @$common.TryCatch
    async toggleOrderListModal() {
        if (!this.orderListModal) await this.renderOrderList() // @Order
        this.orderEditModal = false
        this.orderListModal = !this.orderListModal
    }
    // ============================================================================================
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
    // ============================================================================================
    // 展开商品弹窗
    toggleGoodModal(good = null) {
        this.goodModal = !this.goodModal // @Good
        if (this.goodModal) this.initGoodModel(good) // @Good
    }
    // 商品弹窗 点击确定
    @$common.TryCatch
    async goodModalOk() {
        await this.postGood() // @Good
        await this.renderGoodList() // @Good
        this.goodList.forEach((e) => {
            e['picked'] = false
            this.goodListPicked.forEach((g) => (g._id === e._id ? (e['picked'] = true) : '')) // @Order
        })
        this.goodList = Object.assign([], this.goodList)
        this.renderGoodNameList() // @GoodFilter
        this.toggleGoodModal()
    }
    // ============================================================================================
    // 展开库存列表
    @$common.TryCatch
    async toggleGoodListModal(chargeList = []) {
        if (!this.goodListModal) {
            await this.renderGoodList() // @Good
            this.goodList.forEach((e) => {
                e['picked'] = false
                chargeList.forEach((g) => (g._id === e._id ? (e['picked'] = true) : ''))
            })
            this.goodList = Object.assign([], this.goodList)
            this.renderGoodNameList() // GoodFilter
        }
        this.goodListModal = !this.goodListModal // @Good
    }
    // 库存列表 选择一个库存
    pickGood(good) {
        let outCountList = JSON.parse(JSON.stringify(good.countList))
        if (this.orderListModal) {
            let outCountList = JSON.parse(JSON.stringify(good.countList))
            this.orderEditTarget.goodList.push(Object.assign({ outCountList }, good))
        } else {
            this.goodListPicked.push(Object.assign({ outCountList, orderGoodPrice: 0 }, good)) // @Good
        }
        this.goodListModal = false // @Good
    }
    // 库存弹窗中 删除已选库存
    deleteGoodPicked(good) {
        let index = null
        this.goodListPicked.forEach((e, i) => (e._id === good._id ? (index = i) : '')) // @Order
        if (index !== null) this.goodListPicked.splice(index, 1) // @Order
        this.goodListModal = false // @Good
    }
    // 清空筛选
    @$common.TryCatch
    async filterClear() {
        this.filterKey = '' // @GoodFilter
        await this.renderGoodList() // @Good
        this.goodList.forEach((e) => {
            e['picked'] = false
            this.goodListPicked.forEach((g) => (g._id === e._id ? (e['picked'] = true) : '')) // @Order
        })
        this.goodList = Object.assign([], this.goodList)
        this.renderGoodNameList() // @GoodFilter
    }
    // ============================================================================================
    // 展开客户列表
    @$common.TryCatch
    async toggleCustomerModal() {
        if (!this.customerModal) {
            await this.renderCustomerList() // @Customer
            this.customerList.forEach((e) => (e._id === this.customerPicked._id ? (e['picked'] = true) : ''))
        }
        this.customerModal = !this.customerModal
    }
    // 选择一个客户
    pickCustomer(customer) {
        this.customerPicked = {
            _id: customer._id,
            company: customer.companyName,
            address: customer.companyAddress,
            contact: customer.contact,
        }
        this.toggleCustomerModal() // @React
    }
}
