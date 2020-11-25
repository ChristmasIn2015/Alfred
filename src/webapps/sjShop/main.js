import Vue from 'vue'
Vue.config.productionTip = false

// *
import 'font-awesome/css/font-awesome.min.css'
// import '@/css/sjShop/UI'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)

// *
import '@/common/common.js'

// 1.使用Vue路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './views/routes'
const myRoutes = new VueRouter({
    routes,
})

// 2.Vuex存储
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './views/store'
const myStore = new Vuex.Store(store)
window.$store = myStore

// *.创建实例
import App from './views/Admin/Admin.vue'
new Vue({
    render: (h) => h(App),
    router: myRoutes,
    store: myStore,
}).$mount('#app')
