import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 1.使用Vue路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './router'
const myRouter = new VueRouter({
    routes,
})

// 2.缩放适配
import '@/common/rem.js'

// 3.使用全局UI
import '@/common/sjUI.js'

// *.创建实例
new Vue({
    render: (h) => h(App),
    router: myRouter,
}).$mount('#app')
