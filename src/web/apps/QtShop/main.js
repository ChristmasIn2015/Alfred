import Vue from 'vue'
// ***************************** 自定义模块 **********************************
// * font-awesome
import 'font-awesome/css/font-awesome.min.css'
// * ui vuetify
import Vuetify from 'vuetify/lib/framework'
Vue.use(Vuetify)
const myVuetify = new Vuetify({})
// * common
import '@/common/pack/common-web.js'
// ***************************** Vue **********************************
// 1.使用Vue路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './views/routes'
const myRoutes = new VueRouter({
    routes,
})
myRoutes.beforeEach((to, from, next) => {
    if (to.path !== '/' && !localStorage['token-qqlx']) {
        next({ path: '/' })
    } else {
        next()
    }
})
window.$router = myRoutes

// 2.Vuex存储
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './views/store'
const myStore = new Vuex.Store(store)
window.$store = myStore

// 3.创建实例
Vue.config.productionTip = false
import App from './App.vue'
new Vue({
    render: (h) => h(App),
    router: myRoutes,
    store: myStore,
    vuetify: myVuetify,
}).$mount('#app')
