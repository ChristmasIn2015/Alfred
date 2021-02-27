const store = {
    state: {
        userInfo: {},
    },
    mutations: {
        // *
        setUserInfo(state, DTO) {
            state.userInfo = Object.assign({}, DTO)
        },
        clearUserInfo(state) {
            state.userInfo = {}
        },
    },
}

export default store
