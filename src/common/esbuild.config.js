// NodeJs依赖
const PATH = require('path')

// 打包src下所有ts文件
require('glob')
    .sync(PATH.join(__dirname, './src/*.ts'))
    .forEach((e) => {
        const name = e.split('/').reverse()[0]
        esBuild([e], `./src/common/pack/${name.replace('.ts', '.js')}`, name)
    })
console.log()

function esBuild(entryPoints, outfile, originName) {
    const now = Date.now()
    const isWeb = originName.indexOf('-web') > 0

    isWeb
        ? require('esbuild').buildSync({
              minify: true,
              bundle: true,
              target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
              entryPoints,
              outfile,
          })
        : require('esbuild').buildSync({
              minify: true,
              bundle: true,
              platform: 'node',
              target: ['node10.8'],
              entryPoints,
              external: Object.keys(require(PATH.join(__dirname, '../../package.json')).dependencies), // 第三方依赖项
              outfile,
          })
    const size = parseInt(require('fs').statSync(outfile).size / 1024)
    console.log(
        //
        '\n',
        originName,
        `: ${size}KB`,
        `${isWeb ? 'web: ' : 'node: '}${Date.now() - now}ms`
    )
}
