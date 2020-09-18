const store = {
    state: {
        userInfo: { name: '游客', phone: '' },
        shopInfo: { name: '', _id: -1 },
        houseInfo: { name: '', _id: -1 },
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        },
        getShopInfo(state) {
            return state.shopInfo
        },
        getHouseInfo(state) {
            return state.houseInfo
        },
    },
    mutations: {
        initHouseInfo(state, params) {
            state.houseInfo._id = params._id
            state.houseInfo.name = params.name
        },
        initShopInfo(state, params) {
            state.shopInfo._id = params._id
            state.shopInfo.name = params.name
        },
        clearUserInfo(state) {
            window.localStorage['sjShopToken'] = ''
            state.userInfo = { name: '游客', phone: '' }
        },
        clearHouseInfo(state) {
            state.houseInfo._id = -1
            state.houseInfo.name = ''
        },
    },
}

export default store
