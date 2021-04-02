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