// NodeJs依赖
const PATH = require('path')

// 打包ts下所有ts文件
require('glob')
    .sync(PATH.join(__dirname, './ts/*.ts'))
    .forEach((e) => {
        const name = e.split('/').reverse()[0]
        esBuild([e], `./src/common/pack/${name.replace('.ts', '.js')}`, name)
    })

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
        `${size}KB`,
        `${isWeb ? 'web: ' : 'node: '}${Date.now() - now}ms: `,
        originName,
        `\x1B[42m\x1B[30m build success \x1B[0m`,
        '\n'
    )
}
