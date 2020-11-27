import Customer from '@/webapps/sjShop/module/Customer.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @Customer
    initReact() {}

    // 展开客户列表
    async toggleCustomerModal() {
        try {
            if (!this.customerModal) await this.renderCustomerList() // @Customer
            this.customerModal = !this.customerModal
        } catch (error) {
            $common.loadOff(error)
        }
    }
    // 选择一个客户
    pickCustomer(customer) {
        this.customerPicked = {
            company: customer.companyName,
            address: customer.companyAddress,
            contact: customer.contact,
        }
        this.toggleCustomerModal() // @React
    }
}
