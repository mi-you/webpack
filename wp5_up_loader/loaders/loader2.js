// 推荐使用异步 loader
module.exports = function(content,map,meta){
  console.log(222)
  const callback = this.async();
  setTimeout(() => {
    // 调用callback 才会往下执行，所以 111 会延迟打印
    callback(null,content)
  },1000)
}

module.exports.pitch = function(){
  console.log('pitch 222')
}
