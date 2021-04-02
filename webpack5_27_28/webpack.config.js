/*
  webpack 配置文件

  所有构件工具都是基于node.js平台运行的,模块化默认采用commonJS
  项目和配置是两个方面，项目（src）是使用es6写，
  而配置是是基于node平台所以是CommonJS
*/

// resolve 用来拼接绝对路径
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

// process.env.NODE_ENV = 'development' 

/*
  tree shaking(树摇)，用于去除无用代码
    前提：1. 必须使用es6模块化 2.开启production环境
      之后会自动进行树摇优化
    作用：减少代码体积
      如果由于webpack版本原因或@babel/polyfill（副作用）使css打包后丢失，可以在
      package.json中配置 "sideEffects":["*.css"]
*/ 

module.exports = {
  // 入口起点
  entry:['./src/index.js','./src/index.html'], 
  // 输出
  output:{
    filename:'js/[name].[contenthash:10].js',
    // __dirname 是node.js的变量，代表当前文件目录绝对路径
    path: resolve(__dirname,'build') 
  },
  // loader的配置
  module:{
    rules:[
      {
        /*
          如果有esLint放这里
          原因是下面已经有个处理js兼容性的loader了，而且规范检查要在那之前，
          这里没配置eslint是因为还没查资料看看怎么配
        */ 
      },{
        /*
          一下loader只会匹配一个（不能有两个配置处理同一类型的文件）
          oneOf可以提升构件速度
        */ 
        oneOf:[
          {
            // 匹配哪些文件
            test:/\.css$/,
            use:[
              // use 从后往前执行
              // 创建style标签，将js中的样式资源插入进行，添加到head中生效
              // 'style-loader',
              // 这个loader取代style-loader。作用：提取js中的css成单独文件
              {
                loader:MiniCssExtractPlugin.loader,
                options:{
                // 注意下方的插件中filename中路径(/)有几层就添加几个（../）
                // 否者会出现提取后会变成css/imgs/d6f1f8f1b2.png导致样式里的图片找不到了
                  publicPath:'../'
                }
              },
              // 将css文件变成commonJS模块加载到js中，里面内容是样式字符串
              'css-loader',
              /*
                css兼容性处理使用库postcss，这个库要在webpack中使用要用postcss-loader,
                要是用postcss-loader需要使用插件postcss-preset-env帮助识别一些环境，
                从而加载指定配置，能精确到某一个浏览器的具体版本
                
                这个配置帮postcss找到package.json中browserslist里的配置，
                通过配置加载指定css兼容样式，所以需要我们手动修改package.json

                默认去browserslist里兼容生产环境下的配置，可以通过设置node环境变量给改为开发环境,
                这样就可以在最新的浏览器中写样式，之后在生产中做兼容
                process.env.NODE_ENV = 'development'
              */
              // 'postcss-loader',
              {
                loader:'postcss-loader',// 只写这个等价于 上面的写法
                options:{
                  postcssOptions:{
                    ident:'postcss',// 固定写法
                    plugins:[
                      ['postcss-preset-env']
                    ]
                  }
                }
              }
            ]
          }, {
            test: /\.less$/i,
            // use:['style-loader','css-loader',"less-loader"] 
            // 仿照上面的css处理，也处理下less
            use:[ 
              {
                loader:MiniCssExtractPlugin.loader,
                options:{
                  publicPath:'../'
                }
              },
              'css-loader',
              {
                loader:'postcss-loader',// 只写这个等价于 上面的写法
                options:{
                  postcssOptions:{
                    ident:'postcss',// 固定写法
                    plugins:[
                      ['postcss-preset-env']
                    ]
                  }
                }
              },
              "less-loader"
            ] 
          }, {
            // 问题，处理不了html中的img图片
            test:/\.(jpg|png|gif)/,
            // 使用一个loader就可以不用use了
            loader:'url-loader',
            options:{
              // 图片小于8kb,就会被base64处理
              // 优点：减少强求数量
              // 缺点: 图片体积会变大
              limit:8 * 1024,
              // 去图片hash值前10位+原拓展名
              name:'[contenthash:10].[ext]',
              outputPath:'imgs'
            }
          }, {
            test:/\.html$/,
            // 处理html文件的img图片（负责引入img,从而能被url-loader处理）
            loader:'html-loader',
            options:{
              esModule:false
            }
          }, {
            // 打包字体资源
            test:/\.(eot|svg|ttf|woff|woff2)$/,
            loader:'file-loader',
            options:{
              name:'[contenthash:10].[ext]',
              outputPath:'font'
            }
          }, {
            /*
              js兼容性问题：babel-loader @babel/core @babel/preset-env
              1. 基本js兼容性处理 --> @babel/preset-env
                问题：只能转换基本语法，如Promise不能转换
              2. 全部js兼容问题处理 --> @babel/polyfill
                使用方式：在入口js里直接import '@babel/polyfill'
                问题：我只想解决部分，全部导入太大
              3. 需要做兼容处理：按需加载 --> core-js
            */ 
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                /*
                  开启多进程打包。进程开启大概为600ms,进程通信也有开销。
                  只有工作耗时比较长，才需要多进程打包
                */ 
                loader:'thread-loader',
                options:{
                  Worker:2 //开启2个进程（不清楚是不是指线程）
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns:'usage',
                        corejs:{
                          version:3 //与下的包一致
                        },
                        targets:{
                          ie:'11'
                        }
                      }
                    ]
                  ],
                  /*
                  缓存：
                    babel缓存：开启babel缓存，第二次构建时，会读取之前的缓存
                    文件资源缓存：
                      使用文件名+hash，每次webpack构建时会生成一个唯一的hash,这样就可以避免紧急修改某些代码时不会
                          因为浏览器客户端的强缓存而导致用户更新不了。它的问题是所有文件都会变，即使只调整一部分
                      chunkhash:避免了hash的问题，打包来自于同一个chunk,chunkhash值就一样。其实还是不行，js和css
                          的还会一样，因为在同一个入口文件的css和js会被打包在同一个chunk里
                      contenthash:根据文件内容生成hash值，不同文件一定不一样

                  */ 
                  cacheDirectory:true
                }
              }
            ]
          }
        ]
      },
    ]
  },
  // plugins的配置
  plugins:[
    // 默认会创建一个空的html,引入打包输出的所有资源
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      // 实测webpack5在生产模式会自动压缩html，所以下面的压缩配置也可不写
      minify:{
        // 移除空格
        collapseWhitespace:true,
        // 移除注释
        removeComments:true
      }
    }),
    // 提起css 到单独文件,这里需要去修改上面的css-loader处
    new MiniCssExtractPlugin({
      filename:'css/built[contenthash:10].css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
    ,
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        这个需要在index.js中添加一段代码去注册。想测试这个可以起个node服务

        1. 帮助service Worker快速启动
        2. 删除旧的service Worker
        
        生成一个service Worker配置文件
      */
      clientsClaim:true,
      skipWaiting:true
    })
    //语法检查
    // new ESLintPlugin({
    //   fix:true
    // })
    
  ],
  // 模式 生产环境下会自动压缩js(实际发现html也会被压缩，应该是webpack5内部配置的)
  mode:'development', // mode:'production'
  // 开发服务器 devServer: 用来自动化（自动编译、打开浏览器、自动刷新浏览器）
  // 特点：只会在内存中打包，不会有任何输出
  // 启动指令：npx webpack serve
  devServer:{
    // 项目构建后的路径
    contentBase:resolve(__dirname,'build'),
    // 启动gzip压缩
    compress:true,
    // 端口号
    port:3000,
    //自动打开浏览器
    open:true,
    /*
      开启HMR功能:一个模块发生变化只会重新打包这一个模块而不是所有，提升构件速度
      HMR:hot module replacement; 
      需要开启自动更新内容后生效，也就是target:'web'
      css:自动实现HMR(style-loader和MiniCssExtractPlugin.loader内部都实现了HMR)
      html:默认不能使用HMR;在entry入口将html引入就可以了（使用了只能做到html修改全部更新，
        不是HMR,实际上也不需要做HMR,因为单页面应用就一个html）
      js:需要手动写代码实现，见index.js;而且只能对非入口文件做HMR,因为入口文件引入其他文件
        入口的文件的更新势必会导致其他文件的重新引入执行
    */ 
    hot:true
  },
  // 设置这个可以在修改内容后自动更新
  target:'web',
  /*
    source-map:一种提供源代码到构建后代码映射技术（如果构建后的代码出错了，通过映射可以追踪源代码错误）
    这个地方的组合太多了：结论是开发环境eval-source-map,生产source-map
  */
  devtool:'source-map',
  /*
    代码拆分  
    1.把单入口改成多入口，一个入口打包成一个（一般单页面一个入口，所以不使用）
    2.可以将node_modules中的代码单独打包一个chunk最终输出如下optimization
      自动分析多入口chunk中有没有公共文件，如果有会打包成单独一个chunk
  */
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  externals:{
    /*
      忽略库名 npm包名
      这里忽略的jquery需要在index.html通过cdn引入(由于实际没有使用，也就没再html引入)
    */
    jquery:'jQuery'
  }
}