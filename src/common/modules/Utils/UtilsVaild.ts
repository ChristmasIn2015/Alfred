export default class UtilsVaild {
    // * 校验类方法的通用特性是：通常会返回 Boolean
    constructor() {}

    isValidMobile(phone: string): boolean {
        return /^[1][0-9]{10}$/.test(phone)
    }

    isValidEmail(email: string): boolean {
        return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(email)
    }
}
