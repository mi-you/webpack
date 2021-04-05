const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
/*
  引入核心库去编译
  npm i @babel/core --save
  npm i @babel/preset-env --save
*/ 
const babel = require('@babel/core')

const util = require('util')
const schemaBabel = require('./schemaBabel.json')
/*
  babel.transform用来编译代码的方法
  是一个普通的异步方法
  util.promisify 用来将普通异步转换成基于promise的异步
*/ 
const transform = util.promisify(babel.transform)

module.exports = function(context,map,meta){
  const options = getOptions(this) || {}
  validate(schemaBabel,options,{
    name:'Babel Loader'
  })

  const callback = this.async()
  transform(context,options)
    .then(({code,map}) => callback(null,code,map,meta))
    .catch(callback)
}