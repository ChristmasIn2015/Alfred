var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode: 'production',
    entry: 'main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'sjUI.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!less-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!scss-loader',
            },
            // {
            //     test: /\.less$/,
            //     loader: 'style-loader!css-loader!postcss-loader!less-loader',
            // },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{ loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]' }, { loader: 'file-loader?name=images/[hash:8].[name].[ext]' }],
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
}
