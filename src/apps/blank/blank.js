import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 1.使用Vue路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './router'
const myRouter = new VueRouter({
    mode: 'history',
    routes,
})

// *.创建实例
new Vue({
    render: (h) => h(App),
    router: myRouter,
}).$mount('#app')
