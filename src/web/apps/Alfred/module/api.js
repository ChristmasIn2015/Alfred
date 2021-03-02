const requester = $common.getRequester(
    // 'http://10.52.2.35',
    'http://wqao.top',
    // 成功
    async (result) => {
        if (result.code !== 200) throw new Error(result.message)
        return result.data
    }
)
// ======================================================= 日志
// * 获取日志列表
export function getYjyLogs() {
    return requester.request('GET', '/yjy-log/list', null, $common.getHeaders())
}
// ======================================================= 用户
// * 获取用户信息
export function getUserInfo() {
    return requester.request('POST', '/alfred/user/info', null, $common.getHeaders())
}
// * 用户注册/登录
export function alfredUserLogin(DTO) {
    // account nickname password
    return requester.request('POST', '/alfred/user/login', DTO)
}
// * 获取用户列表
export function getUserList() {
    return requester.request('GET', '/alfred/user/list', null, $common.getHeaders())
}
// ======================================================= Loadding
export const Loadding = $common.Loadding
