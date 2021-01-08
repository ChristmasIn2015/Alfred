# WebBuilder

使用 WebBuilder 可以

```
✔ 构建 Web 应用
✔ 构建 Node 应用
✔ 构建 Electron 应用
```

# 提交 Pull Request 步骤

```
1.点击右上角的 Fork，该项目会复制到您自己的仓库
2.git clone 您仓库中的该项目
3.添加此项目的项目地址，便于本项目master获取最新的更新
    git remote add upstream https://github.com/ChristmasIn2015/WebBuilder.git
4.查看添加本项目git源地址是否成功
    git remote -v
5.创建您的开发分支
    git checkout -b 开发分支名称

******** 开发 ********

6.提交您的更改到开发分支, 而不是您的master分支
    git add  .
    git commit -m "...message..."
    git push origin 开发分支名称
7.获取/并更新本项目最新的代码到master分支
    git fetch upstream
    git rebase upstream/master
    git push origin master
8.将master分支(最新)的代码合并到您的开发分支(或许会存在冲突)
9.前往您的github页面, 点击"Pull Request"
    * 将您的开发分支向本项目的master分支, 提交合并请求
    * 点击 Create pull request
```
