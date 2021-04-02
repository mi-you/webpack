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
import jQuery from 'jquery'
console.log(jQuery)

const a = ar => console.log(ar)
a(123456)
const promise = new Promise(() => {})
console.log(promise)

console.log(json)

// import print from './print.js'
// print()

// 通过js的方式之前某个文件被单独打包
import(/* webpackChunkName:'print'*/'./print.js')
    .then(({add}) => {
        console.log(add(3,7))
    })
    .catch(console)




 //   懒加载:/* webpackChunkName:'lazy' */
 //   预加载:/* webpackChunkName:'lazy',webpackPrefetch:true */
 //   懒加载会在用到再加载，预加载会在浏览器，空闲时偷偷加载（慎用，兼容性差）
document.documentElement.onclick = function(){
    import(/* webpackChunkName:'lazy',webpackPrefetch:true */'./lazy.js')
    .then(({add}) => {
        console.log(add(3,7))
    })
}

/*
    注册serviceWorker
    处理兼容性问题
*/ 
if('serviceWorker' in navigator){
    window.addEventListener('load',() => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => {
                console.log('serverWorker注册成功')
            })
            .catch(() => {
                console.log('serverWorker注册失败')
            })
    })
}



// js的HMR
if(module.hot){
    // 一旦开启了module.hot为true,说明开启了HMR功能
    module.hot.accept('./print.js',function(){
        // 
        print();
    })
}