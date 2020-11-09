import Vue from 'vue'
Vue.config.productionTip = false

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

// *
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)

// *
import '@/public/Common.js'

// *.创建实例
import App from './App.vue'
new Vue({
    render: (h) => h(App),
    router: myRoutes,
    store: myStore,
}).$mount('#app')
