import axios from 'axios'
export default function Server(TargetClass) {
    // * Server
    TargetClass.prototype.Server = class Server {
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
                if (!this.BASE_URL) reject('您未初始化 BASE_URL 无法请求!')
                if (!this.COMPLETE) reject('您未设置 Success回调函数！')
                if (!this.ERROR) reject('您未设置 Error回调函数！')

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
    // * Fetch
    TargetClass.prototype.fetch = function(url, method, params, config) {
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
    // * JSONP
    TargetClass.prototype.myJsonp = function(url, next) {
        window.jsonpCallback = next
        let temp = document.createElement('script')
        temp.id = 'myJsonp'
        temp.src = url
        temp.type = 'text/javascript'
        document.body.appendChild(temp)
    }
}
