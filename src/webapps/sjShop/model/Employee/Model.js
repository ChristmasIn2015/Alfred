import { EmployeeParams, EmployeeFunc } from './Employee.js'

@EmployeeFunc
export default class Model {
    constructor() {
        this.init()
    }
    // *
    @EmployeeParams
    init() {
        this.renderEmployeeList() // @Employee
    }
}
