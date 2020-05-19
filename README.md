# 这是 YJY 项目 CMS 系统的，基于 Vue 的公共组件库

# 目录

[1.使用方法](#使用方法)<br>
[2.组件配置明细](#组件配置明细)

# <span style="color:red;">1.使用方法</span>

1.1 导入 yjyCmsUI.js 文件，使其自动在 Vue 上全局注册所有组件

```
<script src="https://pics.lvjs.com.cn//appcache/h5/cms/yjyCmsUI.js"></script>
```

1.2 所有组件需要在标签传递 :config 配置才能正常渲染展示

```
· 例如中台配置了一个页面标题，其数据为 data，只需要
    let myconfig = window.$configLib.configTitle(data)
    <optionalTitle :config="myconfig"/>
    就能在希望的地方展示CMS页面标题组件

· 自动挂载的 window.$configLib 方法包中
    已含有将中台组件配置 转为 :config 配置的方法

· 目前含有
    页面标题：configTitle
    广告图片：configSwiper
```

# <span style="color:red;">2.组件配置明细</span>

[2.1 页面标题](#optionalTitle：页面标题)<br>
[2.2 图片广告](#optionalSwiper：图片广告)

## optionalTitle：页面标题

```
<optionalTitle :option="myconfig"/>

<script>
    let target = {
        compo: {
            style:{} // 整个组件的行内样式
        },
        title:{
            style:{}
            value:'', // 主标题
        },
        tip:{
            style:{}
            value:'', // 副标题
            },
        icon:{
            style:{}
        }
    }
</script>
```

[返回目录](#目录)

## optionalSwiper：图片广告

```
<optionalSwiper :option="myconfig" @actionSwiper/>

· @actionSwiper 表示轮播图点击事件的回调
· myconfig = {
    compo: {
        style:{} // 整个组件的行内样式
    },
    swiper:{
        style: {},
        option: 见下方 swiperTypeMap
        images:[
            {
                url: '', // 必须
                title: '',
                tip: ''
            }
        ]
    }
}
```

[返回目录](#目录)

```
· swiperTypeMap = {
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
```

[返回目录](#目录)

## optionalSearchBar：搜索框

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
            url
        },
        center:{
            message
            style:{}
        },
        right:{
            url
        }
    }
</script>
```

[返回目录](#目录)

## optionalEntry：图文导航

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

## 参考文章

[1.使用 webpack 打包自己的 Vue 组件](https://www.cnblogs.com/du-blog/p/10933748.html)
