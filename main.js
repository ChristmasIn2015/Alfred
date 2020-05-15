// ******** 20/05/14 由于未知原因 直接用语法导出模块 外部文件无法接收 暂定挂载到window上进行组件获取 ********
// ******** 20/05/15 支持在该文件内直接全局注册 Vue 组件 ********
// ******** 20/05/15 根据 vant/cubeUI 发现只能导出JS方式的模板语法 由于时间原因暂时放弃局部导入 ********
import optionalSwiper from './components/optionalSwiper.vue'
import optionalTitle from './components/optionalTitle.vue'
const components = [optionalSwiper, optionalTitle]

// 1.始终在 Vue 上全局循环注册组件
const install = function(Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 2.在 window 上暴露单个组件
// let yjyCmsUI = {
//   version: '0.0.1',
//   install,
//   optionalSwiper,
//   optionalTitle,
// }
// window.yjyCmsUI = yjyCmsUI