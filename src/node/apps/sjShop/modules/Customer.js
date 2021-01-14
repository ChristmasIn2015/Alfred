import Response from '../../../../database/Response.js'
export default class Customer {
    constructor() {}
    #getModel() {
        return {
            companyName: '',
            companyAddress: '',
            contact: '',
            byUserId: '',
        }
    }
    //
    @Response('添加客户成功')
    async addCustomer(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        //
        let model = this.#getModel()
        model.companyName = request.body.companyName
        model.companyAddress = request.body.companyAddress
        model.contact = request.body.contact
        model.byUserId = user._id
        await Cabin.Customer.create(model) // @Cabin
    }
    //
    @Response()
    async getCustomerList(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        //
        let list = await Cabin.Customer.query({ byUserId: user._id })
        return list
    }
}
