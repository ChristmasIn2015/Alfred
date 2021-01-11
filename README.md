# WebBuilder

## WebBuilder 致力于轻松构建

-   ✔ Web 应用
-   ✔ Node 应用
-   ✔ Electron 应用

## WebBuilder 期待您与我们共同维护这个项目

-   点击右上角的 Fork，该项目会复制到您自己的仓库
-   git clone 您仓库中的该项目
-   添加此项目的项目地址，便于本项目 master 获取最新的更新

```
git remote add upstream https://github.com/ChristmasIn2015/WebBuilder.git
```

-   查看添加本项目 git 源地址是否成功

```
git remote -v
```

-   创建您的<font color="red">开发分支</font>

```
    git checkout -b 开发分支名称
```

-   提交您的更改到<font color="red">开发分支</font> // 而不是您的 master 分支
-   获取/并更新本项目最新的代码到 master 分支

```
    git fetch upstream
    git rebase upstream/master
    git push origin master
```

-   将 master 分支(最新)的代码合并到您的开发分支 // 或许会存在冲突
-   前往您的 github 页面, 点击"Pull Request"
-   将您的<font color="red">开发分支</font>向本项目的 master 分支, 提交合并请求, 即点击 Create pull request
