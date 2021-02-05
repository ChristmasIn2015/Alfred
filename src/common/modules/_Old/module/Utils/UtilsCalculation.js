import { Mark } from '../Log.js'
export default class UtilsCalculation {
    constructor() {}

    @Mark('获取url中的参数 (name, url) => String|Null')
    getQueryValue(name, url) {
        if (!url) {
            url = location.href
        }
        let r = null
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        if (url.indexOf('#') > -1) {
            // hash模式
            let qs = url.split('?')
            // hash模式取参数
            if (qs.length === 2) {
                if (url.indexOf('#') < url.indexOf('?')) {
                    r = qs[1].match(reg)
                } else {
                    let queryString = url.split('#')[0]
                    let sqs = queryString.split('?')
                    if (sqs.length > 1) {
                        r = sqs[1].match(reg)
                    }
                }
            } else if (qs.length === 3) {
                r = qs[2].match(reg)
            }
        } else {
            // 正常模式
            let qs = url.split('?')
            if (qs.length > 1) {
                r = qs[1].match(reg)
            }
        }
        if (r != null) {
            return decodeURIComponent(r[2])
        }
        return null
    }

    @Mark('获取VueUrl参数 ()=> Object:{ param1:?, param2:? }')
    getVueUrlParams() {
        let vueHash = decodeURIComponent(location.href)
        vueHash = vueHash.substring(vueHash.indexOf('?') + 1, vueHash.length)
        let map = {}
        vueHash.split('&').forEach((e) => {
            let temp = e.split('=')
            map[temp[0]] = temp[1]
        })
        return map
    }

    @Mark('深拷贝，支持常见类型 (values)=> Any')
    deepClone(values) {
        let copy
        // Handle the 3 simple types, and null or undefined
        if (null == values || 'object' !== typeof values) return values
        // Handle Date
        if (values instanceof Date) {
            copy = new Date()
            copy.setTime(values.getTime())
            return copy
        }
        // Handle Array
        if (values instanceof Array) {
            copy = []
            for (let i = 0, len = values.length; i < len; i++) {
                copy[i] = deepClone(values[i])
            }
            return copy
        }
        // Handle Object
        if (values instanceof Object) {
            copy = {}
            for (let attr in values) {
                if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
            }
            return copy
        }
        throw new Error("Unable to copy values! Its type isn't supported.")
    }

    @Mark('两个经纬度之间的直线距离km (lat1, lng1, lat2, lng2)=> Number')
    getLatLngDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = (lat1 * Math.PI) / 180.0
        var radLat2 = (lat2 * Math.PI) / 180.0
        var a = radLat1 - radLat2
        var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
        s = s * 6378.137 // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000
        return s.toFixed(2)
    }
}
