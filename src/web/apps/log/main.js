import Vue from 'vue'
Vue.config.productionTip = false

// *
import '@/web/utils/common.js'

// *.创建实例
import App from './App.vue'
new Vue({
    render: (h) => h(App),
}).$mount('#app')
