
/*
  要获取 loader 的 options 的参数，需要用到这个库
    这个库来自于 webpack，专为 loader 使用
  npm i loader-utils --save
*/ 
const { getOptions } = require('loader-utils')
/*
  专门用来验证 options 是否符合规范,一般和上面的一起使用 
  新建schema.js 这个文件写校验规则
  npm i schema-utils --save
*/ 
const { validate } = require('schema-utils')
const schema = require('./schema.json')

module.exports = function(content,map,meta){
  console.log(333)
  // 获取options
  const options = getOptions(this)
  console.log(333,options)
  // 校验options是否合法,失败会退出webpack并报错
  validate(schema,options,{
    name:'loader3'
  })
  return content
}

module.exports.pitch = function(){
  console.log('pitch 333')
}
