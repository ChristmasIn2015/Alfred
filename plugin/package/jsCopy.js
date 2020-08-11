var fs = require('fs')
const glob = require('glob')
/**
 * JS文件拷贝
 * @param src
 * @param dst
 */
var callbackFile = function (src, dst) {
  //src   ./dist/js/index.27c10bee.js
  //dst   ./dist/index/js/index.27c10bee.js
  fs.readFile(src, 'utf8', function (error, data) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
    fs.writeFile(dst, data.toString(), 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
      fs.unlink(src, function () { // js删除成功
      })
      // if (dst.includes('.map')) {
      //   // let srcName = src.split('/')[4]
      //   // fs.unlink(`./dist/js/${srcName}.map`,function () { // 删除map
      //   // })
      //   // fs.unlink(`./dist/js/${srcName}`,function () { // 删除js
      //   // })
      // } else { // JS写入成功
      //   callbackFile(dst, `${dst}.map`)
      // }
    })
  })
}
// 复制目录
glob.sync('./dist/js/*').forEach((filepath, name) => {
  // console.log('filepath',filepath)              //./dist/js/index.27c10bee.js
  let fileNameList = filepath.split('.')           // [ '', '/dist/js/index', '27c10bee', 'js' ]
  let fileName = fileNameList[1].split('/')[3]     // 多页面页面目录  index
  let copyName = filepath.split('/')[3]            //index.27c10bee.js
  let changeDirectory = `./dist/${fileName}/js`    // 多页面JS文件地存放址
  if ( !(fileName.includes('chunk-') || fileName.includes('async')) ) {
    // eslint-disable-next-line
    fs.exists(changeDirectory, function (exists) {
      if (exists) {
        //移动文件
        callbackFile(filepath, `${changeDirectory}/${copyName}`)
      } else {
        //先创建文件夹，再移动文件
        fs.mkdir(changeDirectory, function () {
          callbackFile(filepath, `${changeDirectory}/${copyName}`)
        })
      }
    })
  }
})
