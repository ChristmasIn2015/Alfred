export const SERVER_HOST = window.location.origin

// 2020/02/22 基于 axios 封装常用 HTTP 请求
import axios from 'axios'
export class Requester {
    // 实例变量
    BASE_URL = ''

    // 构造函数
    constructor(baseUrl, complete, error) {
        // 初始化
        this.BASE_URL = baseUrl
        this.COMPLETE = complete
        this.ERROR = error
    }

    // 方法区
    request(methods, url, params, config) {
        return new Promise((resolve, reject) => {
            // 验证用户设置
            if (!this.BASE_URL) reject('您未初始化 Requester 无法请求!')
            if (!this.COMPLETE) reject('您未设置 Requester success回调函数！')
            if (!this.ERROR) reject('您未设置 Requester error回调函数！')

            // 设置 HTTP 请求参数
            let METHODS = methods ? methods : 'GET'
            let URL = this.BASE_URL + (url ? url : '')
            let PARAMS = params
            let HEADERS = {}
            if (config) {
                HEADERS = config.headers ? config.headers : {}
            }

            // 发送请求
            axios({
                method: METHODS,
                url: URL,
                data: PARAMS,
                headers: HEADERS,
            })
                .then((result) => {
                    this.COMPLETE(result, resolve, reject)
                })
                .catch((error) => {
                    this.ERROR(error, reject)
                })
        })
    }
}
