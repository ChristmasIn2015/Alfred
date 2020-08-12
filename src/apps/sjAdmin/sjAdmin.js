import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 1.使用Vue路由 / Vuex存储
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './router'
const myRouter = new VueRouter({
    routes,
})
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store'
const myStore = new Vuex.Store(store)

// 2.缩放适配
import '@/common/rem.js'

// 3.使用全局UI
import '@/common/sj-ui.scss'
import '@/common/sjUI.js'
$sjUI.install(Vue)

// *.创建实例
new Vue({
    render: (h) => h(App),
    router: myRouter,
    store: myStore,
}).$mount('#app')
