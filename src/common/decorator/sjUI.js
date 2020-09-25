import 'font-awesome/css/font-awesome.css'
import '../ui/css/sjUI.scss'
import '../ui/vue/render.js'
export default function SjUI(TargetClass) {
    // vue ui
    console.log(`%c @sjUI: 设置全局UI成功`, 'color: green;')

    // rem
    setDocumentFontSize()
    console.log('%c @sjUI: 设置Rem成功', 'color: green;')
}
// * Rem
function setDocumentFontSize() {
    window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', reFontSize)
    document.addEventListener('DOMContentLoaded', reFontSize)
}
function reFontSize() {
    var clientW = document.documentElement.clientWidth || document.body.clientWidth //当前屏幕宽度
    if (!clientW) return
    // 设计稿/字体 = 375px/16px = 屏幕宽/1rem
    let rem = (clientW * 16) / 1920
    rem = rem < 12 ? 12 : rem
    document.getElementsByTagName('html')[0].style.fontSize = rem + 'px'
}
