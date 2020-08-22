const store = {
    state: {
        userInfo: { name: '游客', phone: '' },
        shopInfo: { name: '', id: -1 },
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        },
        getShopInfo(state) {
            return state.shopInfo
        },
    },
    mutations: {
        initShopInfo(state, params) {
            state.shopInfo.id = params.id
            state.shopInfo.name = params.name
        },
        clearUserInfo(state) {
            window.localStorage['sjShopToken'] = ''
            state.userInfo = { name: '游客', phone: '', nowShopInfo: { name: '', id: -1 } }
        },
    },
}

export default store
