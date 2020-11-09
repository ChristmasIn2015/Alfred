export default function Rem(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        initRem()
        console.log(`%c* Rem: 初始化rem单位成功`, `color: green;`)
        // *
        sourceFunction.apply(this, arguments)
    }
}
function initRem() {
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
