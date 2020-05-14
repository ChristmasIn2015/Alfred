const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  rules: [
    // 解析 less
    // {
    //   test: /\.less$/,
    //   use: [{ loader: 'less-loader' }],
    // },
    // 解析样式文件
    {
      test: /\.css$/,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    },
    // 解析图片文件
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        { loader: 'file-loader' },
        { loader: 'url-loader', options: { limit: 8192 } },
      ],
    },
  ],
  plugins: [
    // 打包前清空 dist 目录
    new CleanWebpackPlugin(),
  ],
}
