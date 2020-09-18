// * 修饰器 of 纯函数合集
const pureColor = '#801dae'
export default function PureFun(TargetClass) {
    // * 时间类
    // TargetClass.prototype.getYYMMDD = getYYMMDD
    // TargetClass.prototype.getYY = getYY
    // TargetClass.prototype.getMM = getMM
    // TargetClass.prototype.getDD = getDD
    // * 定位类
    // TargetClass.prototype.pure_jsonp_getNowXY = pure_jsonp_getNowXY // * 根据IP获取经纬度
    // TargetClass.prototype.log = log // * 彩色打印
    // TargetClass.prototype.chargeHHMMRange = chargeHHMMRange // 判断当前时间是否在某个营业范围
    // TargetClass.prototype.getVueUrlParams = getVueUrlParams // * 获取VueUrl参数
    // TargetClass.prototype.getUrlImage = getUrlImage // URL图片下载
    // TargetClass.prototype.pure_getLatLngDistance = pure_getLatLngDistance // * 从网上Copy的两个经纬度之间的直线距离
    // *
    console.log(`%c @Pure: 绑定通用方法成功`, 'color: green;')
}
// 返回'2020-12-05'
function getYYMMDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let year = time.getFullYear()
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(year) + '-' + String(month) + '-' + String(day)
}
// 返回'2020-12-05'中的'2020'
function getYY(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    return String(time.getFullYear())
}
// 返回'2020-12-05'中的'12'
function getMM(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    return String(month)
}
// 返回'2020-12-05'中的'05'
function getDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(day)
}
// * 打印
function log(message, color) {
    console.log(`%c ${message}`, `color: ${color || pureColor};`)
}
// 判断当前时间是否在某个营业范围 ["09:00", "02:00"] 内
function chargeHHMMRange(range) {
    if (!range || typeof range !== 'object' || range.length < 2) return false
    // 传入的是字符串数组 ["09:00", "02:00"]
    let start = getYYMMDD(Date.now()) + ' ' + range[0]
    let end = getYYMMDD(Date.now()) + ' ' + range[1]

    // 跨日，把 start 变为明日0点
    if (Date.parse(start) > Date.parse(end)) {
        let tomorrow = getYYMMDD(Date.now() + 86400000) + ' ' + '00:00'
        end = getYYMMDD(Date.parse(tomorrow)) + ' ' + range[1]
    }

    // 判断
    let charge = Date.parse(start) <= Date.now() && Date.now() <= Date.parse(end)
    return charge
}
// * 获取VueUrl参数
function getVueUrlParams() {
    let vueHash = decodeURI(location.hash)
    vueHash = vueHash.substring(vueHash.indexOf('?') + 1, vueHash.length)
    let map = {}
    vueHash.split('&').forEach((e) => {
        let temp = e.split('=')
        map[temp[0]] = temp[1]
    })
    console.log(`%c**** Pure 从Url取得参数+ ****`, `color: ${pureColor};`, map)
    return map
}
// URL图片下载
function getUrlImage(targetName) {
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = function() {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        let dataURL = canvas.toDataURL('image/png')
        let a = document.createElement('a')
        a.href = dataURL
        a.download = targetName || 'image.png'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
            document.body.removeChild(a)
            canvas = null
        }, 500)
    }
}
// base64 => Blob : 从网上完全复制的
function base64toBlob(base64) {
    let arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}
// Blob => File : 从网上完全复制的
function blobToFile(theBlob, fileName, fileType) {
    let file = new window.File([theBlob], fileName, fileType)
    return file
}
// H5获取本地图片
function getLocalImage(isMultiple, callback) {
    let tag = document.createElement('input')
    tag.type = 'file'
    tag.accept = 'image/*'
    tag.ref = 'file'
    tag.style.display = 'none'
    tag.multiple = isMultiple
    tag.addEventListener('change', callback)
    document.getElementById('app').appendChild(tag)
    tag.click()
}
// 复制网页选中内容
function mouseCopy(target, next) {
    let transfer = document.createElement('input')
    document.body.appendChild(transfer)
    transfer.value = target // 这里表示想要复制的内容
    transfer.focus()
    transfer.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
    }
    transfer.blur()
    document.body.removeChild(transfer)
    next ? next(target) : ''
}
// 从网上复制下来的移动端长按触发 @touchstart="start" @touchmove="move" @touchend="end"
const longClick = {
    start() {
        this.longClick = 0
        this.timeOutEvent = setTimeout(() => {
            this.longClick = 1
            // async
        }, 500)
    },
    move(e) {
        clearTimeout(this.timeOutEvent)
        this.timeOutEvent = 0
        e.preventDefault()
    },
    end() {
        clearTimeout(this.timeOutEvent)
        if (this.timeOutEvent && this.longClick === 0) {
            //此处为点击事件
        }
        return false
    },
}
// 从网上Copy的两个经纬度之间的直线距离
function pure_getLatLngDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = (lat1 * Math.PI) / 180.0
    var radLat2 = (lat2 * Math.PI) / 180.0
    var a = radLat1 - radLat2
    var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000
    return s.toFixed(2)
}

// * 根据IP获取经纬度
// 浏览器端百度AK d217hZnM3WnQjutDakfPDpXimMdlaIgn
// 服务端百度AK qGr2xr2DRby1ncrkX1ezNrgrozQw2CTf
const baiduAK = process.env.VUE_APP_ENV === 'development' ? 'qGr2xr2DRby1ncrkX1ezNrgrozQw2CTf' : 'd217hZnM3WnQjutDakfPDpXimMdlaIgn'
const baiduOrigin = 'https://api.map.baidu.com'
function pure_jsonp_getNowXY(ip) {
    let result = {
        lng: '', // 经度
        lat: '', // 纬度
        msg: '',
        success: false,
    }
    // JSONP 从第三方API获取经纬度
    let queryUrl = `${baiduOrigin}/location/ip?ak=${baiduAK}&coor=bd09ll` + (ip ? `&ip=${myIP}` : '')
    return new Promise((resolve, reject) => {
        $common.myJsonp(`${queryUrl}&callback=jsonpCallback`, (info) => {
            if (info.status !== 0) {
                result.msg = '获取经纬度失败'
                reject(result)
                return
            }
            result.lat = info.content.point.y // 纬度
            result.lng = info.content.point.x // 经度
            result.success = true
            console.log(`%c**** Pure 根据当前IP取得经纬度 ****`, `color: ${pureColor}`, result)
            resolve(result)
        })
    })
}
// * 根据关键字取得经纬度及其他相关信息
function jsonp_getPositionByWords(words) {
    let result = {
        lng: '', // 经度
        lat: '', // 纬度
        msg: '',
        success: false,
    }
    // JSONP
    return new Promise((resolve, reject) => {
        $common.myJsonp(`${baiduOrigin}/geocoding/v3/?address=${words}&output=json&ak=${baiduAK}&callback=jsonpCallback`, (info) => {
            if (info.status !== 0) {
                result.msg = '获取经纬度失败'
                reject(result)
                return
            }
            result.lng = info.result.location.lng // 经度
            result.lat = info.result.location.lat // 纬度
            result.success = true
            console.log(`%c 1.关键字 ${words} 取得经纬度`, 'color: red', result)
            resolve(result)
        })
    })
}
// * 根据经纬度取得具体地址及其他相关信息
function jsonp_getPositionByXY(lng, lat, words) {
    // JSONP
    return new Promise((resolve, reject) => {
        $common.myJsonp(
            `${baiduOrigin}/reverse_geocoding/v3/?ak=${baiduAK}&output=json&coordtype=wgs84ll&location=${lat},${lng}&callback=jsonpCallback`,
            (position) => {
                if (position.status !== 0) {
                    console.log(`%c * getPositionByIP myJsonp`, 'color: red', position)
                    reject({ formatted_address: '查询地址失败', addressComponent: { city: '查询地址失败' }, error: true })
                    return
                }
                // 3.触发回调
                if (words) position.result.formatted_address = words
                console.log(`%c 2.根据经纬度获取当前地址`, 'color: red', position.result)
                resolve(position.result)
            }
        )
    })
}
