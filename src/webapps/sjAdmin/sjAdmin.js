import Vue from 'vue'
Vue.config.productionTip = false

// 1.使用Vue路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './views/routes'
const myRouter = new VueRouter({
    routes,
})
// 2.Vuex存储
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './views/store'
const myStore = new Vuex.Store(store)
window.$store = myStore

// *
import Common from '@/common/Common.js'
window.$common = new Common()

// *.创建实例
import App from './views/App.vue'
new Vue({
    render: (h) => h(App),
    router: myRouter,
    store: myStore,
}).$mount('#app')
