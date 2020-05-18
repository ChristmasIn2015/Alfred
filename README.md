# 这是 YJY 项目 CMS 系统的，基于 Vue 的公共组件库

## yjyCmsUI 生成方法

0.参考文章<br>
[使用 webpack 打包自己的 Vue 组件](https://www.cnblogs.com/du-blog/p/10933748.html)

1.根据 webpack.config.js 的入口文件 执行

```
npm run build
```

2.在 dist 目录下会生成构建文件 yjyCmsUI.js<br>

- 接下来在需要使用的 Vue 项目中导入这个文件 (位置自定义)

```
import "./yjyCmsUI.js"
```

- 或者在 html 模板中从第三方导入 (位置自定义)

```
<script src="yjyCmsUI.js"></script>
```

3.目前 UI 使用介绍

- optionalTitle：组件标题

```
// ** compo 代表整个组件
// ** style 会被全部设置为对应目标的行内样式，单位自定义，需要适配各屏幕（推荐rem）
<optionalTitle :option="target"/>

<script>
    let target = {
        compo: {
            style:{}
        },
        title:{
            value:String,
            style:{}
        },
        tip:{
            value:String,
            style:{}
            },
        icon:{
            style:{}
        }
    }
</script>
```

- optionalSwiper：图片广告

```
// ** compo 代表整个组件
// ** style 会被全部设置为对应目标的行内样式，单位自定义，需要适配各屏幕（推荐rem）
// ** @actionSwiper 会触发每张图片广告的点击事件
<optionalSwiper :option="target"/>

<script>
    let target = {
        compo: {
            style:{}
        },
        swiper:{
            option: 见下方 swiperTypeMap
            style:{}
            images:[
                {
                    url // 必须
                    title
                    tip
                }
            ]
        }
    }
</script>
```

```

<script>
    const swiperTypeMap = {
        // N张铺满平铺
        0: {
            // centeredSlides: true, // 居中
            slidesPerView: 1, // 每个轮播块的图片数量
            autoplay: true, // 自动播放
            speed: 500, // 左右滑动速度，越大越慢
        },
        // 1.5张3D轮播
        1: {
            effect: 'coverflow',
            coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
            },
            spaceBetween: 40,
            slidesPerView: 1.3,
            autoplay: true,
        },
        // 1.3 张滑动平铺
        2: {
            spaceBetween: 15,
            slidesPerView: 1.3,
            autoplay: true,
        },
        // 2.5 张平铺
        3: {
            spaceBetween: 10,
            slidesPerView: 2.5,
            autoplay: true,
        },
        // 1.5 张平铺
        4: {
            spaceBetween: 15,
            slidesPerView: 1.5,
            autoplay: true,
        },
        // 3 张静止广告图
        5: {
            threeAD: true
        },
    }
</script>
```

- optionalSearchBar：搜索框

```
// ** compo 代表整个组件
// ** style 会被全部设置为对应目标的行内样式，单位自定义，需要适配各屏幕（推荐rem）
// ** @leftAction / @centerAction / @rightAction 会触发左方/中央/右方置物点击事件
<optionalTitle :option="target"/>

<script>
    let target = {
        compo: {
            style:{}
        },
        left:{
            url // 必须
        },
        center:{
            message
            style:{}
        },
        right:{
            url // 必须
        }
    }
</script>
```

- optionalEntry：功能入口栏

```
// ** compo 代表整个组件
// ** style 会被全部设置为对应目标的行内样式，单位自定义，需要适配各屏幕（推荐rem）
// ** @entryAction 会触发入口点击事件
<optionalTitle :option="target"/>

<script>
    let target = {
        compo: {
            style:{}
        },
        list:[
            {
                url // 必须
                tip // 必须
            }
        ...
        ]
    }
</script>
```
