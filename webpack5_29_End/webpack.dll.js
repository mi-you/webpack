
const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry:{
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery:['jquery']
  },
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'build/dll'),
    // 打包的库里向外暴露出去的叫什么名字
    library:'[name]_[hash]'
  },
  plugins:[
    // 打包生成manifest.json --> 提供jquery映射
    new webpack.DllPlugin({
      // 映射库的暴露的内容名称
      name:'[name]_[hash]',
      // 输出文件路径
      path:resolve(__dirname,'build/dll/manifest.json')
    })
  ],
  mode:'production'
}