import axios from 'axios'
import { Mark } from './Log.js'
export default class Server {
    constructor() {}

    @Mark('1.获取一个配置型的服务对象，可以通过这个对象批量进行网络请求')
    @Mark('const hotel_server = $common.getServer(')
    @Mark('  1.成功回调：(result, resolve, reject)=>{ 在这里判断接口返回值是否成功，如 code === 200，如果成功就 resolve 反之 reject },')
    @Mark('  2.失败回调：(result, reject)=>{ 说明网络请求失败，如 nginx 500 错误，一般直接 reject 就好了 },')
    @Mark('  3.某个服务地址:如 //yjy.joyuai.com，也可以不传，默认 window.location.origin')
    @Mark(')')
    @Mark('2.使用这个服务对象发送网络请求')
    @Mark('hotel_server.request("POST", "/yjy/coupon/get", {..参数..}, 请求头) <= 返回Promise')
    @Mark('请求头可以通过 $common.getHeaders() / $common.getBHeaders() 获取，或自定义')
    getServer(complete, error, newOrigin) {
        return new MyServer(complete, error, newOrigin)
    }

    @Mark('进行一次性的网络请求 返回Promise')
    @Mark('$common.fetch("/coupon/getList") ')
    @Mark('$common.fetch("//yjy.joyuai.com/coupon/getList") // 默认GET')
    @Mark('$common.fetch("//yjy.joyuai.com/coupon/getList", "POST", {..参数..}, 请求头) ')
    @Mark('请求头可以通过 $common.getHeaders() / $common.getBHeaders() 获取，或自定义')
    fetch(url, method, params, config) {
        return new Promise((resolve, reject) => {
            let requestParams = {
                method: method || 'GET',
                url: url,
                data: params || '',
                headers: Object.assign({}, config || {}),
            }
            $common.log({ fetch: requestParams })
            axios(requestParams)
                .then((result) => resolve(result.data))
                .catch((error) => reject(error))
        })
    }

    @Mark('某些第三方API需要使用JSONP，如百度定位服务')
    @Mark('$common.myJsonp(url, 回调函数)')
    myJsonp(url, next) {
        if (!global) {
            window.jsonpCallback = next
            let temp = document.createElement('script')
            temp.id = 'myJsonp'
            temp.src = url
            temp.type = 'text/javascript'
            document.body.appendChild(temp)
        }
    }
}
class MyServer {
    // 构造函数
    constructor(complete, error, newOrigin) {
        this.BASE_URL = newOrigin || window.location.origin
        this.COMPLETE = complete
        this.ERROR = error
        this.defaultHeaderConfig = {}
    }

    // 方法区
    setDefaultHeader(config) {
        this.defaultHeaderConfig = Object.assign({}, config)
    }
    request(methods, url, params, config) {
        return new Promise((resolve, reject) => {
            // 验证用户设置
            let errorMessage = ''
            if (!this.BASE_URL) errorMessage = '您未初始化 BASE_URL 无法请求!'
            if (!this.COMPLETE) errorMessage = '您未设置 Success 回调函数！'
            if (!this.ERROR) errorMessage = '您未设置 Error 回调函数！'
            if (errorMessage) {
                reject(errorMessage)
                return
            }

            // 发送请求
            let requestParams = {
                method: methods ? methods : 'GET',
                url: this.BASE_URL + (url ? url : ''),
                data: params,
                headers: config || this.defaultHeaderConfig || {},
            }
            if (methods === 'GET' || methods === 'get') {
                let url = requestParams.url
                url += '?'
                for (let key in params) url += `${key}=${params[key]}&`
                url = url.slice(0, url.length - 1)
                requestParams.url = url
            }
            $common.log({ server: requestParams })
            axios(requestParams)
                .then((result) => this.COMPLETE(result, resolve, reject))
                .catch((error) => this.ERROR(error, reject))
        })
    }
}
