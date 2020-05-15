# 这是 YJY 项目 CMS 系统的，基于 Vue 的公共组件库

## yjyCmsUI 生成方法

1.根据 webpack.config.js 的入口文件 执行

```
npm run build
```

2.在 dist 目录下会生成构建文件 yjyCmsUI.js<br>
接下来在需要使用的 Vue 项目中导入这个文件 (位置自定义)

```
import "./yjyCmsUI.js"
```

3.或者在 html 模板中从第三方导入 (位置自定义)

```
<script src="yjyCmsUI.js"></script>
```
