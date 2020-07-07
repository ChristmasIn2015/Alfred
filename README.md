# 这是 YJY 项目 CMS 系统的，基于 Vue 的公共组件库

# <span style="color:red;">1.使用方法</span>

### <span style="color:red;">1.1 导入 yjyCmsUI.js 文件，使其自动在 Vue 上全局注册所有组件</span>

```
0.不需要在项目中安装任何第三方依赖

1.导入方式
    1.1 在webpack模板文件 x.html 中通过CDN导入
        <script src="https://pics.lvjs.com.cn//appcache/h5/cms/yjyCmsUI.js"/>

    1.2或者在 webpack 入口（一般是main.js文件）中导入
        import "yjyCmsUI.js"

2.如果出现 "某组件未注册" 的情况，在 webpack 入口（一般是main.js文件）中添加：
    import "yjyCmsUI.js"
    window.$configLib.install(Vue)
```

### <span style="color:red;">1.2 所有组件需要在标签传递 :config 配置才能正常渲染展示</span>

```
例如中台配置了一个【页面标题】组件，这个组件的中台配置数据为 data：

    1.只需要使用【页面标题】组件对应的 configTitle 配置方法（见下方）
        let myconfig = window.$configLib.configTitle(data)
        注意：配置仅对CMS中台传递的data有效

    2.然后在对应页面中添加以下html代码
        <optionalTitle :config="myconfig"/>
    就能在希望的地方展示CMS页面标题组件
```

# <span style="color:red;">2.组件一览</span>

# 目录

[2.0 功能链接](#optionalsearchbar)<br>
[2.1 页面标题](#optionaltitle)<br>
[2.2 图片广告](#optionalswiper)<br>
[2.3 图片导航](#optionalentry)<br>
[2.4 信息搜索](#optionalsearchbar)<br>
[2.5 动态资讯](#optionalmsg)<br>
[2.6 tab 资讯](#optionaltab)<br>
[2.7 tab 列表](#optionaltabplus)<br>
[2.8 tab 推荐](#optionaltabnail)<br>
[2.9 推荐切换](#optionaltabimage)<br>
[2.0.1 优惠券组件](#optionalusercoupon)<br>

## optionalTitle

```
<optionalTitle :config="myconfig"/>

配置方法
    let myconfig = window.$configLib.configTitle(data)
```

[返回目录](#目录)

## optionalSwiper

```
<optionalSwiper :config="myconfig" @clickAction="myMethod"/>

配置方法
    let myconfig = window.$configLib.configSwiper(data)
点击事件:
    @clickAction(params)：根据 params 自行处理相关业务
```

[返回目录](#目录)

## optionalEntry

```
<optionalEntry :config="myconfig" @entryAction="myMethod"/>

配置方法
    let myconfig = window.$configLib.configEntry(data)
点击事件:
    @entryAction(params)：根据 params 自行处理相关业务
```

[返回目录](#目录)

## optionalSearchBar

```
<optionalSearchBar :config="myconfig"
    @leftAction="myMethod"
    @clickAction="myMethod"
    @rightAction="myMethod"
    @renderAction="setRedPot"
/>

配置方法（当为信息搜索时）
    let myconfig = window.$configLib.configSearchBar(data)

配置方法（当为功能链接时）
    let myconfig = window.$configLib.configIconBar(data)

点击事件:
    @leftAction(params)：根据 params 自行处理相关业务
    @clickAction(params)：根据 params 自行处理相关业务
    @rightAction(params)：根据 params 自行处理相关业务

渲染事件：
    @renderAction(params)
    1 params 格式始终为
        - name：组件名称
        - value：中台传递的组件数据
        - next(Number direction)
            direction：0 左边添加小红点 1 右边添加小红点
    2 next是组件内部的回调函数，用于渲染组件
    3 组件初始化时会自动触发一次这个渲染事件

```

[返回目录](#目录)

## optionalMsg

```
<optionalMsg :config="myconfig" @clickAction="myMethod" @renderAction="getList"/>

配置方法
    let myconfig = window.$configLib.configMsg(data)
点击事件:
    @clickAction(params)：根据 params 自行处理相关业务

渲染事件：
    @renderAction(params)
    1 params 格式始终为
        - name：组件名称
        - value：中台【资讯接口】数据
        - next(Array[] list)
            list：根据【接口】返回的资讯数组
    2 next是组件内部的回调函数，用于渲染组件
    3 组件初始化时会自动触发一次这个渲染事件

```

[返回目录](#目录)

## optionalTab

```
<optionalTab :config="myconfig" @clickAction="myMethod" @renderAction="getList"/>

配置方法
    let myconfig = window.$configLib.configTabs(data)
点击事件:
    @clickAction(params)：根据 params 自行处理相关业务

渲染事件：
    @renderAction(params)
    1 params 格式始终为
        - name：组件名称
        - value：中台【接口】数据
        - next(Array[] list)：
            next：是组件内部的回调函数，用于渲染组件
            list：根据【接口】返回的资讯数组 list 进行渲染

        * 其中list列表每项数据格式仅为
        {
            title: '',
            list:[
                {
                    type: '',
                    url: '',
                    title: '',
                    tip: '',
                    score: '',
                    price: 0,
                    productId: '',
                    tags: [],
                }
                ...
            ]
        }
    2 组件初始化时会自动触发一次这个渲染事件
    3 tab切换时，也会触发这个渲染事件

```

[返回目录](#目录)

## optionalTabPlus

```
<optionalTabPlus :config="myconfig" @clickAction="myMethod" @renderAction="getList"/>

配置方法
    let myconfig = window.$configLib.configTabPlus(data)
点击事件:
    @clickAction(params)：根据 params 自行处理相关业务

渲染事件：
    @renderAction(params)
    1 params 格式始终为
        - name：组件名称
        - value：中台【接口】数据
        - next(Array[] list, Number type)：
            next：是组件内部的回调函数，用于渲染组件
            list：根据【接口】返回的资讯数组 list 进行渲染
            type：0 列表 1 小图 2 大图 3 瀑布流

        * 其中list列表每项数据格式仅为
        {
            title: '',
            titleLink: {},
            list:[
                {
                    type: '',
                    url: '',
                    title: '',
                    tip: '',
                    score: '',
                    price: 0,
                    productId: '',
                    tags: [],
                }
                ...
            ]
        }
    2 组件初始化时会自动触发一次这个渲染事件

```

[返回目录](#目录)

## optionalTabNail

```
<optionalTabNail :config="myconfig" @clickAction="myMethod" @renderAction="getList"/>

配置方法
    let myconfig = window.$configLib.configTabNail(data)
点击事件:
    @clickAction(params)：根据 params 自行处理相关业务

渲染事件：
    @renderAction(params)
    1 params 格式始终为
        - name：组件名称
        - value：中台【接口】数据
        - next(Array[] list, Number type)：
            next：是组件内部的回调函数，用于渲染组件
            list：根据【接口】返回的资讯数组 list 进行渲染
            type：0 列表 1 小图 2 大图 3 瀑布流

        * 其中list列表每项数据格式仅为
        {
            title: '',
            titleLink: {},
            list:[
                {
                    type: '',
                    url: '',
                    title: '',
                    tip: '',
                    score: '',
                    price: 0,
                    productId: '',
                    tags: [],
                }
                ...
            ]
        }
    2 组件初始化时会自动触发一次这个渲染事件

```

[返回目录](#目录)

## optionalTabImage

```
<optionalTabImage :config="myconfig" @clickAction="myMethod" @renderAction="getList"/>

配置方法
    let myconfig = window.$configLib.configTabImage(data)
点击事件:
    @clickAction(params)：根据 params 自行处理相关业务

渲染事件：
    @renderAction(params)
    1 params 格式始终为
        - name：组件名称
        - value：中台【接口】数据
        - next(Array[] list, Number type)：
            next：是组件内部的回调函数，用于渲染组件
            list：根据【接口】返回的资讯数组 list 进行渲染
            type：4 // 固定

        * 其中list列表每项数据格式仅为
        {
            title: '',
            titleLink: {},
            list:[
                {
                    type: '',
                    url: '',
                    title: '',
                    tip: '',
                    score: '',
                    price: 0,
                    productId: '',
                    tags: [],
                }
                ...
            ]
        }
    2 组件初始化时会自动触发一次这个渲染事件

```

[返回目录](#目录)

## optionalUserCoupon

```
<optionalUserCoupon :config="myconfig" @clickAction="myMethod" @renderAction="getList"/>

配置方法
    let myconfig = window.$configLib.configUserCoupon(data)
点击事件:
    @clickAction(params)：根据 params 自行处理相关业务

```

[返回目录](#目录)

## 参考文章

[1.使用 webpack 打包自己的 Vue 组件](https://www.cnblogs.com/du-blog/p/10933748.html)
