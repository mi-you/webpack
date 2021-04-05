const { SyncHook,SyncBailHook,AsyncParallelHook,AsyncSeriesHook} = require('tapable')

class Lesson {
  constructor(){
    this.hooks = {
      /* 同步钩子 依次执行 */ 
      // go:new SyncHook(['address']),
      go:new SyncBailHook(['address']), // 一旦有返回值就退出
      /* 异步钩子 */
      // leave: new AsyncParallelHook(['name','age']), // 异步并行
      leave: new AsyncSeriesHook(['name','age']), // 异步串行
    }
  }
  tap(){
    // 往hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('class0318',address => {
      console.log('class0318',address)
      return 111
    })
    this.hooks.go.tap('class0410',address => {
      console.log('class0410',address)
    })
    this.hooks.leave.tapAsync('class0510',(name,age,callback) => {
      setTimeout(() => {
        console.log('class0510',name,age)
        callback()
      },2000)
    })
    this.hooks.leave.tapPromise('class0610',(name,age) => {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          console.log('class0510',name,age)
          resolve()
        },1000)
      })
    })
  }
  start(){
    // 触发hooks
    this.hooks.go.call('0318开课啦')
    this.hooks.leave.callAsync('米又',18,() => {
      // 代表 所有leave容器中的函数触发完，才触发
      console.log('end~~')
    })
  }
}

const l = new Lesson();
// 注册
l.tap()
// 触发
l.start()