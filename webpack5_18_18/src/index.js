/*
 index.js:webpack入口起点文件

 1. 运行指令
    开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
    生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
    命令行输入 webpack也可以直接打包到dist文件下
2. 结论（不用配置）
    1.webpack 能处理js/json文件
    2.开发和生产环境都能将ES6模块化编译成浏览器能识别的模块化
    3.生产会自动压缩优化
*/ 
// import '@babel/core'
import json from './index.json'
import './style/index.css'
import './style/index.less'
import './font/iconfont.css'
const a = ar => console.log(ar)
a(1234567)
const promise = new Promise(() => {})
console.log(promise)

console.log(json)
// import es from '../es6.js'
// console.log(es)