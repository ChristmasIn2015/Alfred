import optionalTitle from './yjyCompos/optionalTitle.vue'
import optionalSwiper from './yjyCompos/optionalSwiper.vue'
import optionalSearchBar from './yjyCompos/optionalSearchBar.vue'
import optionalEntry from './yjyCompos/optionalEntry.vue'
import optionalMsg from './yjyCompos/optionalMsg.vue'
import optionalTab from './yjyCompos/optionalTab.vue'
import optionalTabPlus from './yjyCompos/optionalTabPlus/optionalTabPlus.vue'
import optionalUserCoupon from './yjyCompos/optionalUserCoupon.vue'
import optionalTabNail from './yjyCompos/optionalTabPlus/optionalTabNail.vue'
import optionalTabImage from './yjyCompos/optionalTabPlus/optionalTabImage.vue'

const compos = [
  optionalTitle,
  optionalSwiper,
  optionalSearchBar,
  optionalEntry,
  optionalMsg,
  optionalTab,
  optionalTabPlus,
  optionalUserCoupon,
  optionalTabNail,
  optionalTabImage,
]

// // 1.始终在 Vue 上全局循环注册组件
function install(Vue, opts = {}) {
  compos.forEach((component) => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 2.在 window 上暴露控制层
import configLib from './common/A_control.js'
configLib['install'] = install
window.$configLib = configLib
