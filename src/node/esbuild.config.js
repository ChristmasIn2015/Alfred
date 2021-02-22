// NodeJs依赖
const PATH = require('path')

// 打包apps下所有ts文件
require('glob')
    .sync(PATH.join(__dirname, './apps/*/*.ts'))
    .forEach((e) => {
        const name = e.split('/').reverse()[1]
        esBuild([e], e.replace('.ts', `.js`), name)
    })

function esBuild(entryPoints, outfile, originName) {
    const now = Date.now()
    require('esbuild').buildSync({
        // minify: true,
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
        `node: ${Date.now() - now}ms: `,
        originName,
        `\x1B[42m\x1B[30m NodeTs build success \x1B[0m`,
        '\n'
    )
}
