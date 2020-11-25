import { EmployeeParams, EmployeeFunc } from './Employee.js'

@EmployeeFunc
export default class Model {
    constructor() {
        this.initModel()
    }
    // * 初始化参数
    @EmployeeParams
    initModel() {
        this.renderEmployeeList() // @Employee
    }
}
