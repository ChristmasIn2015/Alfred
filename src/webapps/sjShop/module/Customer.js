import { createCustomer, getCustomerList } from './api.js'
export default function CustomerParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.customerModal = false
        this.customerTableColumn = [
            { title: '公司', key: 'companyName' },
            { title: '地址', key: 'companyAddress' },
            { title: '联系人', key: 'contact' },
            { title: '操作', slot: 'action' },
        ]
        this.customerModel = {
            company: '',
            address: '',
            contact: '',
        }
        this.customerPicked = {
            company: '',
            address: '',
            contact: '',
        }
        this.customerList = []
        // * 方法
        this.renderCustomerList = renderCustomerList
        this.addCustomer = addCustomer
        // *
        sourceFunction.apply(this, arguments)
    }
}

async function renderCustomerList() {
    try {
        $load.show()
        let list = await getCustomerList()
        this.customerList = Object.assign([], list.reverse())
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
async function addCustomer() {
    try {
        $load.show()
        await createCustomer(this.customerModel.company, this.customerModel.address, this.customerModel.contact)
        $load.hide()
        this.renderCustomerList() // @Customer
        $tip('添加客户成功')
    } catch (error) {
        $common.loadOff(error)
    }
}
