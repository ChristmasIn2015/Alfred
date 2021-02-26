import axios from 'axios'

// 声明
enum RequesterModel {
    GET = 'GET',
    POST = 'POST',
}
class Axios {
    public DEFAULT_HEADER: object = {}
    constructor(public BASE_URL: string, private COMPLETE: (result) => void) {
        this.BASE_URL = BASE_URL
        this.COMPLETE = COMPLETE
    }

    // 发送网络请求
    async request(method: RequesterModel.GET | RequesterModel.POST, url: string, params: object, config: object): Promise<any> {
        try {
            // 发送请求
            // $common.log({ server: requestParams })
            const result = await axios({
                method,
                url: this.BASE_URL + (url || ''),
                data: params,
                headers: config || this.DEFAULT_HEADER || {},
            })
            const DATA = await this.COMPLETE(result.data)
            return DATA
        } catch (error) {
            throw error // 这一步会被更外层的 try/catch
        }
    }
}
export default class Requester {
    constructor() {}

    getRequester(BASE_URL: string, COMPLETE: (result) => void) {
        return new Axios(BASE_URL, COMPLETE)
    }

    async fetch(url: string, method?: RequesterModel.GET | RequesterModel.POST, params?: object, config?: object): Promise<any> {
        // $common.log({ fetch: requestParams })
        let result = await axios({
            method,
            url,
            data: params,
            headers: config,
        })
        return result.data
    }
}
