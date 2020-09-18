// 这段代码是为了在 Vue 中全局调用组件 SanJi 组件
import Vue from 'vue'
let vm = null

// ***********************************************************
import sjTip from './sjTip.vue'
vm = new Vue({
    render(createElement) {
        return createElement(sjTip)
    },
}).$mount() // 虚拟DOM转为实际DOM结点
document.body.appendChild(vm.$el) // 挂载
window.$tip = vm.$children[0].toShow

// ***********************************************************
import sjLoadding from './sjLoadding.vue'
vm = new Vue({
    render(createElement) {
        return createElement(sjLoadding)
    },
}).$mount() // 虚拟DOM转为实际DOM结点
document.body.appendChild(vm.$el) // 挂载
window.$load = {
    show: vm.$children[0].show,
    hide: vm.$children[0].hide,
}

// ***********************************************************
import sjConfirm from './sjConfirm.vue'
vm = new Vue({
    render(createElement) {
        return createElement(sjConfirm)
    },
}).$mount() // 虚拟DOM转为实际DOM结点
document.body.appendChild(vm.$el) // 挂载
window.$confirm = vm.$children[0].show

// ***********************************************************
window.$warn = (message) => {
    console.log(`%c ERROR: ${message}`, 'color: red;')
}
