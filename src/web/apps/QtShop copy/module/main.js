import Vue from 'vue'
// ***************************** 自定义模块 **********************************
// * ui
import 'font-awesome/css/font-awesome.min.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)
// * common
import '@/common/pack/common-web.js'
// ***************************** Vue **********************************

// 1.使用Vue路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from '../views/routes'
const myRoutes = new VueRouter({
    routes,
})

// 2.Vuex存储
import Vuex from 'vuex'
Vue.use(Vuex)
import store from '../views/store'
const myStore = new Vuex.Store(store)
window.$store = myStore

// 3.创建实例
Vue.config.productionTip = false
import App from './views/Admin/Admin.vue'
new Vue({
    render: (h) => h(App),
    router: myRoutes,
    store: myStore,
}).$mount('#app')
// ***************************** End **********************************
