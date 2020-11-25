import Employee from '@/webapps/sjShop/module/Employee.js'

export default class React {
    constructor() {
        this.init()
    }
    // *
    @Employee
    async init() {
        try {
            await this.renderEmployeeList() // @Employee
        } catch (error) {
            $common.loadOff(error)
        }
    }
}
