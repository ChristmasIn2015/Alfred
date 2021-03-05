const store = {
    state: {
        userInfo: {},
        shopInfo: {},
        houseInfo: {},
    },
    mutations: {
        // *
        setUserInfo(state, DTO) {
            state.userInfo = Object.assign({}, DTO)
        },
        clearUserInfo(state) {
            state.userInfo = {}
        },
        // *
        setShopInfo(state, DTO) {
            state.shopInfo = Object.assign({}, DTO)
        },
        clearShopInfo(state) {
            state.shopInfo = {}
        },
        // *
        setHouseInfo(state, DTO) {
            state.houseInfo = Object.assign({}, DTO)
        },
        clearHouseInfo(state) {
            state.houseInfo = {}
        },
    },
}

export default store
