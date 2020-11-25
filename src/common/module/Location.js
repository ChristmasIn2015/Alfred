import { Mark } from './Log.js'
export default class UtilsLocation {
    constructor() {
        // 浏览器端百度AK d217hZnM3WnQjutDakfPDpXimMdlaIgn
        // 服务端百度AK qGr2xr2DRby1ncrkX1ezNrgrozQw2CTf
        this.baiduOrigin = 'https://api.map.baidu.com'
        this.baiduAK = process.env.VUE_APP_ENV === 'development' ? 'qGr2xr2DRby1ncrkX1ezNrgrozQw2CTf' : 'd217hZnM3WnQjutDakfPDpXimMdlaIgn'
    }

    @Mark('获取经纬度 (words: String) =>Promise =>{lat, lng, success: Boolean, msg}; words非必填; success判断是否成功;')
    getLocation(words) {
        return new Promise((resolve, reject) => {
            // * 关键词获取经纬度
            if (words) this.#getLocationByWords(resolve, reject, words)

            // * H5取得经纬度
            if (navigator.geolocation) this.#getLocationByH5(resolve, reject)
        })
    }

    @Mark('根据经纬度取得中文地址 (lng, lat, words) =>Promise =>{result, error};  error判断是否成功;')
    getAddress(lng, lat, words) {
        return new Promise((resolve, reject) => {
            // 1.BMap获取地址, 小程序会安全提示 不使用
            // if (window.BMap && window.BMap.Geolocation) this.getAddressByBMap(lng, lat, resolve, words)
            // 2.经纬度获取地址
            this.#getAddressByBaiduAPI(lng, lat, words, resolve)
        })
    }

    // 关键字取得经纬度
    #getLocationByWords(resolve, reject, words) {
        let result = {
            lng: '', // 经度
            lat: '', // 纬度
            msg: '',
            success: false,
        }
        let queryUrl = `${this.baiduOrigin}/geocoding/v3/?address=${words}&output=json&ak=${this.baiduAK}&callback=jsonpCallback`
        // @Server
        $common.myJsonp(queryUrl, (info) => {
            if (info.status !== 0) {
                result.msg = '获取经纬度失败'
                reject(result)
                return
            }
            result.lng = info.result.location.lng // 经度
            result.lat = info.result.location.lat // 纬度
            result.success = true
            $common.log({ '* 关键字': words, '* 关键字获取经纬度': result })
            // *
            let target = document.getElementById('myJsonp')
            target ? document.body.removeChild(target) : ''
            // *
            resolve(result)
        })
    }
    // H5 取得经纬度
    #getLocationByH5(resolve, reject) {
        let result = {
            lng: '', // 经度
            lat: '', // 纬度
            msg: '获取经纬度失败',
            success: false,
        }
        navigator.geolocation.getCurrentPosition(
            (h5Position) => {
                result.lng = h5Position.coords.longitude
                result.lat = h5Position.coords.latitude
                result.success = true
                $common.log({ '* H5获取经纬度成功': result })
                resolve(result)
            },
            (error) => {
                $common.log({ '* H5获取经纬度失败': error.message })
                resolve(result)
            }
        )
    }
    // IP 取得经纬度 不准确 且跨省存在获取缓慢 易失败
    #getLocationByIp(resolve, reject, ip) {
        let result = {
            lng: '', // 经度
            lat: '', // 纬度
            msg: '',
            success: false,
        }
        // let queryUrl = `${this.baiduOrigin}/location/ip?ak=${this.baiduAK}` + (ip ? `&ip=${ip}` : '')
        // let queryUrl = `${this.baiduOrigin}/location/ip?ak=${this.baiduAK}&coor=bd09ll` + (ip ? `&ip=${ip}` : '')
        let queryUrl = `${this.baiduOrigin}/location/ip?ak=${this.baiduAK}&coor=gcj02` + (ip ? `&ip=${ip}` : '')
        // @Server
        $common.myJsonp(`${queryUrl}&callback=jsonpCallback`, (info) => {
            if (info.status !== 0) {
                result.msg = '获取经纬度失败'
                reject(result)
                return
            }
            result.lat = info.content.point.y // 纬度
            result.lng = info.content.point.x // 经度
            result.success = true
            $common.log({ '* IP获取经纬度': result })
            // *
            let target = document.getElementById('myJsonp')
            target ? document.body.removeChild(target) : ''
            // *
            resolve(result)
        })
    }
    // 获取地址 by BaiduAPI
    #getAddressByBaiduAPI(lng, lat, words, resolve) {
        $common.myJsonp(
            // `${this.baiduOrigin}/reverse_geocoding/v3/?ak=${this.baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback`,
            // `${this.baiduOrigin}/reverse_geocoding/v3/?ak=${this.baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback&coordtype=bd09ll`,
            `${this.baiduOrigin}/reverse_geocoding/v3/?ak=${this.baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback&coordtype=gcj02ll`,
            // `${this.baiduOrigin}/reverse_geocoding/v3/?ak=${this.baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback&coordtype=wgs84ll`,
            (position) => {
                if (position.status !== 0) {
                    $common.log({ '* 根据经纬度获取当前地址 失败': position })
                    resolve({ formatted_address: '查询地址失败', addressComponent: { city: '查询地址失败' }, error: true })
                    return
                }
                // 3.触发回调
                if (words) position.result.formatted_address = words
                $common.log({ '* 根据经纬度获取当前地址 成功': position })
                // *
                let target = document.getElementById('myJsonp')
                target ? document.body.removeChild(target) : ''
                resolve(position.result)
            }
        )
    }
    // 获取地址 by BMap
    #getAddressByBMap(lng, lat, resolve, words) {
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((result) => {
            if (result) {
                let address = result.address.city + result.address.district + result.address.province + result.address.street + result.address.street_number
                $common.log({ '* BMAP获取地址': result, '* BMAP获取地址 object': address })
                resolve({ formatted_address: address, addressComponent: { city: address }, error: false })
            } else {
                $common.log('* BMAP获取地址失败 => 使用经纬度获取地址')
                this.#getAddressByBaiduAPI(lng, lat, words, resolve)
            }
        })
    }
}
