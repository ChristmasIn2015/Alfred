const store = {
    state: {
        userInfo: { name: '游客', phone: '', token: '', nowShopInfo: { name: '无', id: -1 }, nowWareHouseInfo: { name: '无', id: -1 } },
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        },
    },
    mutations: {
        clearUserInfo(state) {
            state.userInfo = { name: '游客', phone: '', token: '', nowShopInfo: { name: '无', id: -1 }, nowWareHouseInfo: { name: '无', id: -1 } }
        },
        initShopInfo(state, params) {
            state.userInfo.nowShopInfo.id = params.id
            state.userInfo.nowShopInfo.name = params.name
        },
    },
}

export default store
