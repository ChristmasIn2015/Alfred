import axios from 'axios'
export default function Server(TargetClass) {
    // * Fetch
    TargetClass.prototype.myFetch = function(url, method, params, config) {
        return new Promise((resolve, reject) => {
            let requestParams = {
                method: method || 'GET',
                url: url,
                data: params || '',
                headers: Object.assign({}, config.header || {}),
            }
            $common.postMyError('myFetch ' + JSON.stringify(requestParams))
            axios(requestParams)
                .then((result) => {
                    resolve(result.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    // * JSONP
    TargetClass.prototype.myJsonp = function(url, next) {
        window.jsonpCallback = next
        let temp = document.createElement('script')
        temp.id = 'myJsonp'
        temp.src = url
        temp.type = 'text/javascript'
        document.body.appendChild(temp)
    }
    // * Server
    TargetClass.prototype.Server = class Server {
        static BASE_URL = window.location.origin // for Server.BASE_URL

        // 构造函数
        constructor(complete, error) {
            this.BASE_URL = window.location.origin
            this.COMPLETE = complete
            this.ERROR = error
        }

        // 方法区
        request(methods, url, params, config) {
            return new Promise((resolve, reject) => {
                // 验证用户设置
                if (!this.BASE_URL) reject('您未初始化 BASE_URL 无法请求!')
                if (!this.COMPLETE) reject('您未设置 Success回调函数！')
                if (!this.ERROR) reject('您未设置 Error回调函数！')

                // 设置 HTTP 请求参数
                let METHODS = methods ? methods : 'GET'
                let URL = this.BASE_URL + (url ? url : '')
                let PARAMS = params
                let HEADERS = {}
                if (config) {
                    HEADERS = config.header ? config.header : {}
                }

                // 发送请求
                let requestParams = {
                    method: METHODS,
                    url: URL,
                    data: PARAMS,
                    headers: HEADERS,
                }
                $common.postMyError('Server ' + JSON.stringify(requestParams))
                axios(requestParams)
                    .then((result) => {
                        this.COMPLETE(result, resolve, reject)
                    })
                    .catch((error) => {
                        this.ERROR(error, reject)
                    })
            })
        }
    }
}
