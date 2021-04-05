// loader本质是函数，会被webpack调用
/*
  content: 文件内容
  map: 映射信息
  meta: 文件元信息
*/ 
// 同步 loader, 异步loader 见loader2.js
module.exports = function(content,map,meta){
  console.log(111)
  /*
    1.可以直接return
      return content
    2.也可以调用callback方法，第一个参数是有没有错误，没有传个null。
      一般不传后面两个参数
      this.callback(null,content,map,meta)
  */
  this.callback(null,content,map,meta)
}

/*
  use:['loader1','loader2','loader3']
  执行结果是
    pitch 111
    pitch 222
    pitch 333
    333      
    222      
    111   
*/ 
module.exports.pitch = function(){
  console.log('pitch 111')
}
