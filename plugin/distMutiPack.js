const fs = require('fs')
// * Node glob 模块允许你使用 *等符号, 来解析匹配路径
// * glob.sync: Array 用于同步获取匹配的文件列表
const glob = require('glob')

// 1.参数准备
let htmlList = glob.sync('./dist/*.html')
let jsList = glob.sync('./dist/js/*')
let cssList = glob.sync('./dist/css/*')
let imgList = glob.sync('./dist/img/*')

// 2.实际读写文件
for (let i = 0; i < htmlList.length; i++) {
    let entryName = htmlList[i].split('.')[1].split('/')[2]

    // 2.1 判断有没有对应项目的目录, 没有就创建它
    let targetPath = `./dist/${entryName}`
    if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath)

    // 2.2 把所有JS全扔对应项目目录
    if (!fs.existsSync(targetPath + '/js')) fs.mkdirSync(targetPath + '/js')
    jsList.forEach((path) => {
        let name = path.split('/')[3]
        let mine = fs.readFileSync(path, 'utf-8')
        fs.writeFileSync(`${targetPath}/js/${name}`, mine, 'utf-8')
    })

    // 2.3 把所有CSS全扔对应项目目录
    if (!fs.existsSync(targetPath + '/css')) fs.mkdirSync(targetPath + '/css')
    cssList.forEach((path) => {
        let name = path.split('/')[3]
        let mine = fs.readFileSync(path, 'utf-8')
        fs.writeFileSync(`${targetPath}/css/${name}`, mine, 'utf-8')
    })

    // 2.4 把所有img全扔对应项目目录
    if (!fs.existsSync(targetPath + '/img')) fs.mkdirSync(targetPath + '/img')
    imgList.forEach((path) => {
        let name = path.split('/')[3]
        let mine = fs.readFileSync(path, 'utf-8')
        fs.writeFileSync(`${targetPath}/img/${name}`, mine, 'utf-8')
    })

    // 2.4 向对应项目的目录添加html文件
    let htmlSource = `./dist/${entryName}.html`
    let myHtml = fs.readFileSync(htmlSource, 'utf-8')
    fs.writeFileSync(`${targetPath}/${entryName}.html`, myHtml, 'utf-8')
}

// 3.删除多余文件
cssList.forEach((path) => {
    fs.unlinkSync(path)
})
jsList.forEach((path) => {
    fs.unlinkSync(path)
})
imgList.forEach((path) => {
    fs.unlinkSync(path)
})
htmlList.forEach((path) => {
    fs.unlinkSync(path)
})
fs.rmdirSync('./dist/js')
fs.rmdirSync('./dist/css')
fs.rmdirSync('./dist/img')
