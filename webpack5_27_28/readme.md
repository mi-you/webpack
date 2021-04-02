# 代码视频逻辑
1. 使用webpack,cli是通过指令使用webpack
```
npm i webpack webpack-cli --save-dev
```
2. 打包css (打包到js中)
```
npm i style-loader css-loader --save-dev
```
3. 打包less 
npm install less less-loader --save-dev
4. 打包html
```
npm i html-webpack-plugin -D 
```
5. 打包样式中的图片(url-loader依赖file-loader)
```
npm i url-loader file-loader -D
```
6. 打包html中的图片
```
npm i html-loader -D 
```
7. 打包font字体资源(使用之前的file-loader)
8. 提起css 到单独文件
```
npm i mini-css-extract-plugin -D
```
9. 提高css的兼容性
```
npm i postcss-loader postcss-preset-env -D
```
10. 压缩css
```
npm i optimize-css-assets-webpack-plugin -D
```
11. 语法检查(也可用其他如：airbnb) 有点问题好像
```
npm install eslint eslint-webpack-plugin --save-dev
```
12. js兼容性处理（只能转换普通语法，如Promise不能转换）
```
npm i babel-loader @babel/core @babel/preset-env -D
```
13. 全部js兼容处理（对普通语法之外的全部处理）
```
npm i @babel/polyfill 
```
14. 按需js兼容（对普通语法之外的按需处理）
```
npm i core-js -D
```
15. js压缩（webpack 生产环境会自动压缩js代码，不需要管）
16. 生产环境基本配置
17. 性能优化介绍（介绍了开发和生产的需求差异，分析差异）
18. HMR的实现（热更新）
19. source-map（控制台报错的信息展示分析，找错）
20. oneOf（避免每个文件每次都解析都判断每个loader）
21. 缓存（babel缓存，文件资源缓存）,这里添加了一个server.js用于启动node服务 观察缓存
22. tree shaking(树摇)，用于去除无用代码
23. 代码分隔
  - webpack.config.js optimization配置
  - webpack.config.js 多入口配置（一般多页面使用）
  - 通过js代码指定单独达成一个包
24. PWA 渐进式开发（离线访问）
```
npm i workbox-webpack-plugin -D
```
25. 多进程打包（一般针对babel）
```
npm i thread-loader -D
```
26. externals:阻止将一些包打包进项目比如jquery（此时需要在index.html通过cdn引入,cdn的引入优势？）