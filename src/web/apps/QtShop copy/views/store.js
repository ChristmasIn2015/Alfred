const store = {
    state: {
        userInfo: {},
        shopInfo: {},
        houseInfo: {},
    },
    mutations: {
        // *
        setUserInfo(state, params) {
            state.userInfo = Object.assign({}, params)
        },
        setShopInfo(state, params) {
            state.shopInfo = Object.assign({}, params)
        },
        setHouseInfo(state, params) {
            state.houseInfo = Object.assign({}, params)
        },
        // *
        clearUserInfo(state) {
            state.userInfo = {}
        },
        clearShopInfo(state) {
            state.shopInfo = {}
        },
        clearHouseInfo(state) {
            state.houseInfo = {}
        },
    },
}

export default store
