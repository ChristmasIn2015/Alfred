// * 修饰器 of 纯函数合集
const pureColor = '#801dae'
export default function PureFun(TargetClass) {
    // TargetClass.prototype.getYYMMDD = getYYMMDD
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
