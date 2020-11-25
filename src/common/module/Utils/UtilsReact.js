import { Mark } from '../Log.js'
import Fingerprint from 'fingerprintjs'
export default class UtilsReact {
    // * 交互类方法的通用特性是：会实际和用户交互，并影响用户
    constructor() {
        this.windowFinger = global ? 'runByNodeJs' : new Fingerprint({ canvas: true }).get()
    }

    @Mark('获取浏览器指纹 ()=> String')
    getWindowFinger() {
        return this.windowFinger
    }

    @Mark('动态设置页面根字体 ()=> 无返回值')
    initRem() {
        // ** DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
        window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', this.#reFontSize)
        document.addEventListener('DOMContentLoaded', this.#reFontSize)
    }
    #reFontSize() {
        var clientW = document.documentElement.clientWidth || document.body.clientWidth //当前屏幕宽度
        if (!clientW) return
        let rem = (clientW * 16) / 375
        rem = rem < 12 ? 12 : rem
        document.getElementsByTagName('html')[0].style.fontSize = rem + 'px'
    }

    @Mark('切换URL协议来拨打电话 (phone: Number)=> 无返回值')
    toPhone(phone) {
        if (!phone) $toast(`手机号 ${phone} 无效`)
        if (!phone) return
        location.assign('tel:' + phone)
    }

    @Mark('复制网页选中内容 (target: String, next: Function)=> next(target)')
    mouseCopy(target, next) {
        // **
        let transfer = document.createElement('input')
        transfer.style.position = 'fixed'
        transfer.style['z-index'] = '-1'
        transfer.style.top = '-100%'
        document.body.appendChild(transfer)

        // **
        transfer.value = target // 这里表示想要复制的内容
        transfer.focus()
        transfer.select()
        if (document.execCommand('copy')) document.execCommand('copy')
        transfer.blur()
        document.body.removeChild(transfer)
        next ? next(target) : ''
    }

    @Mark('往链接中拼接参数 (url: String, params: Object)=> 拼接后的url')
    addUriParams(url, params) {
        const paramsArray = []
        Object.keys(params).forEach((key) => params[key] && paramsArray.push(`${key}=${params[key]}`))
        if (url.search(/\?/) === -1) {
            url += `?${paramsArray.join('&')}`
        } else {
            url += `&${paramsArray.join('&')}`
        }
        return url
    }
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
