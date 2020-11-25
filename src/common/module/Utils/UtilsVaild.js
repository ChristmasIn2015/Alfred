import { Mark } from '../Log.js'
export default class UtilsVaild {
    // * 校验类方法的通用特性是：通常会返回 Boolean
    constructor() {}

    @Mark('验证手机号码 (String) => Boolean')
    isValidMobile(phoneNum) {
        return /^[1][0-9]{10}$/.test(phoneNum)
    }

    @Mark('验证邮箱 (String) => Boolean')
    isValidEmail(email) {
        return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(email)
    }

    @Mark('验证身份证 (String) => Any')
    isValidID(num) {
        num = num.toUpperCase()
        if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
            return false
        }
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let len, re
        len = num.length
        if (len === 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
            let arrSplit = num.match(re)
            // 检查生日日期是否正确
            let dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
            let bGoodDay
            bGoodDay =
                dtmBirth.getYear() === Number(arrSplit[2]) && dtmBirth.getMonth() + 1 === Number(arrSplit[3]) && dtmBirth.getDate() === Number(arrSplit[4])
            if (!bGoodDay) {
                return false
            } else {
                // 将15位身份证转成18位
                // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
                let nTemp = 0
                let i
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i]
                }
                num += arrCh[nTemp % 11]
                return num
            }
        }
        if (len === 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
            let arrSplit = num.match(re)
            // 检查生日日期是否正确
            let dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
            let bGoodDay
            bGoodDay =
                dtmBirth.getFullYear() === Number(arrSplit[2]) && dtmBirth.getMonth() + 1 === Number(arrSplit[3]) && dtmBirth.getDate() === Number(arrSplit[4])
            if (!bGoodDay) {
                return false
            } else {
                // 检验18位身份证的校验码是否正确。
                // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                let valnum
                let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
                let nTemp = 0
                let i
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i]
                }
                valnum = arrCh[nTemp % 11]
                if (valnum !== num.substr(17, 1)) {
                    return false
                }
                return num
            }
        }
        return false
    }

    @Mark('验证身份证 (Any) => Boolean')
    isNumeric(input) {
        return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input)
    }

    @Mark('判断中文 (Any) => Boolean')
    isChinese(input) {
        return /^[\u4E00-\u9FA5]+$/.test(input)
    }

    @Mark('判断有效字符串 (Any) => Boolean')
    usefulValue(query) {
        if (query === null) {
            return false
        } else if (query === undefined) {
            return false
        } else if (query === '') {
            return false
        } else if (query === 'null') {
            return false
        } else if (query === 'NaN') {
            return false
        } else if (query === 'undefined') {
            return false
        }
        return true
    }
}
