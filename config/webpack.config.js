// 路径
const path = require('path')
 // html分离
const HtmlWebpackPlugin = require('html-webpack-plugin');
//VueLoaderPlugin,注意路径是('vue-loader/lib/plugin')，而不是('vue-loader')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: {
    index: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  devServer: { // 开发服务器的配置
    port: 8000,
    progress: true, // 编译的进度条
    // contentBase: path.join(__dirname, 'static'), // 以static目录为默认启动目录
    compress: true, // 自动压缩
    open: true, // 自动打开浏览器
  },
  plugins: [ // 数组,放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: 'index.html', // 注意路径为根目录下的路径
      filename: 'index.html', // 打包后也叫做 index.html
      minify: { // 压缩这个html文件(主要是对HTML文件进行压缩)
        removeAttributeQuotes: true, // 删除这个html文件的双引号
        collapseWhitespace: true, // 变成一行
        removeComments:true, // 去除注释
      },
      hash: true
    }),
    new VueLoaderPlugin()
  ],
  module: { // 模块loader 默认是从右到左，从下到上执行,多个loader需要一个数组，loader是有顺序的，默认是从右向左执行，loader还可以写成 对象方式
    rules: [
      {
        test: /\.css$/,
        use: [
          "css-loader",
          "postcss-loader" //给CSS3语法，比如transfrom加上前缀， 需要新建 postcss.config.js 配置文件，需要引用 autoprefixer 这个插件
        ]
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
      },
      {
        test: /\.html$/, // 找到html文件
        use: 'html-withimg-loader' //解决html引入图片打包的问题
      },
      {
        test: /\.(png|jpg|gif)$/, // 找到所有的图片
        use: { // 做一个限制，当我们的图片，小于多少k的时候，用base64来转化，否则用file-loader产生真实的图片
          loader: 'url-loader',
          options: {
            limit: 200 * 1024 // 小于200k，会转化成base64
          }
        }
      },
      {
        test: /\.js$/, // 找到所有的js文件
        use: {
          loader: 'babel-loader', // 用babel-loader，需要把ES6转换成ES5语法
          options: {
            presets: [ // babel的集合
              '@babel/preset-env' // @babel/preset-env 就是用来将ES6转化成ES5语法的
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { 'legacy': true }], // 将ES7语法中的类装饰器转换成ES5语法， legacy 是宽松模式
              ['@babel/plugin-proposal-class-properties', { 'loose': true }], // 将ES7语法中的类转换成ES5语法
              '@babel/plugin-transform-runtime' //避免编译出现重复
            ]
          }
        },
        include: path.resolve(__dirname, 'src'), // 只查找src目录下的js，不找node_modules里面的js
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  }
}
