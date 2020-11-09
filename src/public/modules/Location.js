export function Location(TargetClass) {
    // * 定位的方法
    TargetClass.prototype.getLocation = getLocation
    TargetClass.prototype.getLocationByIp = getLocationByIp
    TargetClass.prototype.getLocationByWords = getLocationByWords
    TargetClass.prototype.getLocationByH5 = getLocationByH5
    // *
    TargetClass.prototype.getAddress = getAddress
    TargetClass.prototype.getAddressByBMap = getAddressByBMap
    TargetClass.prototype.getAddressByLngLat = getAddressByLngLat
}
// 浏览器端百度AK d217hZnM3WnQjutDakfPDpXimMdlaIgn
// 服务端百度AK qGr2xr2DRby1ncrkX1ezNrgrozQw2CTf
const baiduAK = process.env.VUE_APP_ENV === 'development' ? 'qGr2xr2DRby1ncrkX1ezNrgrozQw2CTf' : 'd217hZnM3WnQjutDakfPDpXimMdlaIgn'
const baiduOrigin = 'https://api.map.baidu.com'
export function getLocation(words, ip) {
    // * 关键词获取经纬度
    if (words) return new Promise((resolve, reject) => this.getLocationByWords(resolve, reject, words))

    // * 通过APP获取经纬度
    if (this.platEnv.isYjyApp()) {
        return new Promise((resolve, reject) => {
            this.riskNativeMethod('yjyGetLocation').then(
                (value) => {
                    resolve({
                        lng: value.longitude, // 经度
                        lat: value.latitude, // 纬度
                        msg: '',
                        success: true,
                    })
                },
                (error) => this.getLocationByIp(resolve, reject)
            )
        })
    }

    // * 通过小程序取得经纬度
    let params = this.getVueUrlParams()
    if (params.lng && params.lat) {
        return new Promise((resolve, reject) => {
            resolve({
                lng: params.lng, // 经度
                lat: params.lat, // 纬度
                msg: '',
                success: true,
            })
        })
    }

    // * H5取得经纬度
    if (navigator.geolocation) return new Promise((resolve, reject) => this.getLocationByH5(resolve, reject))

    // * IP获取经纬度
    return new Promise((resolve, reject) => this.getLocationByIp(resolve, reject, ip))
}
export function getAddress(lng, lat, words) {
    return new Promise((resolve, reject) => {
        // 1.BMap获取地址, 小程序会安全提示 暂时不使用
        // if (window.BMap && window.BMap.Geolocation) this.getAddressByBMap(lng, lat, resolve, words)
        // 2.经纬度获取地址
        this.getAddressByLngLat(lng, lat, words, resolve)
    })
}
// * 关键字获取经纬度
function getLocationByWords(resolve, reject, words) {
    let result = {
        lng: '', // 经度
        lat: '', // 纬度
        msg: '',
        success: false,
    }
    let queryUrl = `${baiduOrigin}/geocoding/v3/?address=${words}&output=json&ak=${baiduAK}&callback=jsonpCallback`
    // @Server
    this.myJsonp(queryUrl, (info) => {
        if (info.status !== 0) {
            result.msg = '获取经纬度失败'
            reject(result)
            return
        }
        result.lng = info.result.location.lng // 经度
        result.lat = info.result.location.lat // 纬度
        result.success = true
        this.postError({ '* 关键字': words, '* 关键字获取经纬度': result })
        // *
        let target = document.getElementById('myJsonp')
        document.body.removeChild(target)
        // *
        resolve(result)
    })
}
// * H5获取经纬度
function getLocationByH5(resolve, reject) {
    let result = {
        lng: '', // 经度
        lat: '', // 纬度
        msg: '',
        success: false,
    }
    navigator.geolocation.getCurrentPosition(
        (h5Position) => {
            result.lng = h5Position.coords.longitude
            result.lat = h5Position.coords.latitude
            result.success = true
            this.postError({ '* H5获取经纬度': result })
            resolve(result)
        },
        (error) => {
            this.postError({ 'H5获取经纬度 error': error, 'H5获取经纬度 error message': error.message })
            this.getLocationByIp(resolve, reject)
        }
    )
}
// * IP获取经纬度
function getLocationByIp(resolve, reject, ip) {
    let result = {
        lng: '', // 经度
        lat: '', // 纬度
        msg: '',
        success: false,
    }
    // let queryUrl = `${baiduOrigin}/location/ip?ak=${baiduAK}` + (ip ? `&ip=${ip}` : '')
    // let queryUrl = `${baiduOrigin}/location/ip?ak=${baiduAK}&coor=bd09ll` + (ip ? `&ip=${ip}` : '')
    let queryUrl = `${baiduOrigin}/location/ip?ak=${baiduAK}&coor=gcj02` + (ip ? `&ip=${ip}` : '')
    // @Server
    this.myJsonp(`${queryUrl}&callback=jsonpCallback`, (info) => {
        if (info.status !== 0) {
            result.msg = '获取经纬度失败'
            reject(result)
            return
        }
        result.lat = info.content.point.y // 纬度
        result.lng = info.content.point.x // 经度
        result.success = true
        this.postError({ '* IP获取经纬度': result })
        // *
        let target = document.getElementById('myJsonp')
        document.body.removeChild(target)
        // *
        resolve(result)
    })
}
// * BMAP获取地址
function getAddressByBMap(lng, lat, resolve, words) {
    let geolocation = new BMap.Geolocation()
    geolocation.getCurrentPosition((result) => {
        if (result) {
            let address = result.address.city + result.address.district + result.address.province + result.address.street + result.address.street_number
            this.postError({ '* BMAP获取地址': result, '* BMAP获取地址 object': address })
            resolve({ formatted_address: address, addressComponent: { city: address }, error: false })
        } else {
            this.postError('* BMAP获取地址失败 => 使用经纬度获取地址')
            this.getAddressByLngLat(lng, lat, words, resolve)
        }
    })
}
// * 经纬度获取地址
function getAddressByLngLat(lng, lat, words, resolve) {
    this.myJsonp(
        // `${baiduOrigin}/reverse_geocoding/v3/?ak=${baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback`,
        // `${baiduOrigin}/reverse_geocoding/v3/?ak=${baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback&coordtype=bd09ll`,
        `${baiduOrigin}/reverse_geocoding/v3/?ak=${baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback&coordtype=gcj02ll`,
        // `${baiduOrigin}/reverse_geocoding/v3/?ak=${baiduAK}&output=json&location=${lat},${lng}&callback=jsonpCallback&coordtype=wgs84ll`,
        (position) => {
            if (position.status !== 0) {
                this.postError({ '* 根据经纬度获取当前地址 失败': position })
                resolve({ formatted_address: '查询地址失败', addressComponent: { city: '查询地址失败' }, error: true })
                return
            }
            // 3.触发回调
            if (words) position.result.formatted_address = words
            this.postError({ '* 根据经纬度获取当前地址': position })
            // *
            let target = document.getElementById('myJsonp')
            document.body.removeChild(target)
            resolve(position.result)
        }
    )
}
