var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'production',
  entry: 'main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'yjyCmsUI.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          { loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]' },
          { loader: 'file-loader?name=images/[hash:8].[name].[ext]' },
        ],
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
}
