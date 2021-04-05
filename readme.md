## webpack5_1_1
- [B站学习视频地址](https://www.bilibili.com/video/BV1e7411j7T5)
- 学习此视频时webpack官网版本是webpack5.28.0；视频时webpack4.x的，所以会有细微差别
- 5_1_17：是一些基础的配置
- 5_18_18：在5_1_17基础上修改了一点点配置，但也值得注意。（对应生成环境，修改的不大，没什么细节）
- 5_19_19：
> - webpack性能优化
>	  - 开发环境性能优化
>	  - 生产环境性能优化
> - 开发环境性能优化
>	  - 优化打包构建速度
>	  - 优化代码调试
> - 生产环境性能优化
>	  - 优化打包构建速度
>	  - 优化代码运行的性能
- 5_20_26:在5_1_17基础上进行,增加一些配置参数
- 5_27_28:pwa和多线程打包
- 5_29_end:dll
## wp5
- [B站学习视频](https://www.bilibili.com/video/BV1cv411C74F)
- wp5_up_react
  ```
  create-react-app wp5_up_react
  npm run eject
  ```
- wp5_up_vue
  ```
  vue create wp5_up_vue
  vue inspect --mode=development > webpack.dev.js
  vue inspect --mode=production > webpack.prod.js 
  ```
- wp5_up_loader
  - loader本质是函数，会被webpack调用
- wp5_up_plugin
  - 终止于 P<sub>18</sub>