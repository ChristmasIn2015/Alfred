const requester = $common.getRequester(
    'http://10.52.2.35',
    // 成功
    async (result) => {
        if (result.code !== 200) throw new Error(result.message)
        return result.data
    }
)
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
