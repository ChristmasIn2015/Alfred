var fs = require('fs')
const glob = require('glob')
/**
 * html文件替换
 * @param src
 * @param dst
 */
var callbackFile = function (src, dst, name, filepath) {
  console.log('src',src)
  console.log('dst',dst)
  fs.readFile(src, 'utf8', function (error, data) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
    let regCss = new RegExp('/css/' + name + '', 'g')
    let regJs = new RegExp('/js/' + name + '', 'g')
    let htmlContent = data.toString().replace(regCss, `/${name}/css/${name}`).replace(regJs, `/${name}/js/${name}`)
    fs.writeFile(dst, htmlContent, 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
      // console.log('html重新写入成功')
      if (src.indexOf('/index.html') === -1) {
        fs.unlink(src, function () {
          //  console.log('html删除成功')
        })
      }
      // fs.unlink(filepath, function () { 
      // })
      // fs.unlink(filepath + '.map', function () { 
      // })
    })
  })
}
// 读取目录
glob.sync('./src/pages/*/*.js').forEach((filepath, name) => {
  let fileNameList = filepath.split('.')
  let fileName = fileNameList[1].split('/')[3]// 多页面页面目录
  let thisDirectory = `./dist/${fileName}/${fileName}.html`// 多页面JS文件地存放址
  let changeDirectory = `./dist/${fileName}/index.html`// 多页面JS文件地存放址
  // console.log('fileName------------------',fileName)
  // console.log('filepath------------------',filepath)
  if (!(fileName.includes('chunk-') || fileName.includes('async'))) {
    callbackFile(thisDirectory, changeDirectory, fileName, filepath)
  }
})
