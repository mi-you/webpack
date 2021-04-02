/*
  启动一个node服务器 用于观察缓存
  服务器启动
    node server.js 
    或
    npm i nodemon -g
    nodemon server.js
*/

const express = require('express')

const app = express()

app.use(express.static('build',{maxAge:1000 * 3600}))

app.listen(5000)
