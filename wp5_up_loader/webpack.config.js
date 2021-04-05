const path = require('path')
/*
  默认去src/index.js打包，打包到dist下
  npx webpack 执行打包
*/ 
module.exports = {
  module:{
    rules:[
      {
        test:/\.js$/,
        // loader:path.resolve(__dirname,'loaders','loader1')
        // loader:'loader1'
        // use:[
        //   'loader1',
        //   'loader2',
        //   {
        //     loader:'loader3',
        //     options:{
        //       name:'miyou'
        //     }
        //   }
        // ]
        loader:'babelLoader',
        options:{
          presets:[
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  // 配置loader解析规则
  resolveLoader:{
    modules:[
      // 默认值，这也是我们写loader不用写路径的原因
      'node_modules',
      // 增加loader查找范围,去我们自己定义的文件下找
      path.resolve(__dirname,'loaders')
    ]
  }  ,
  mode:'development'
}