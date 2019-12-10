const express = require('express');
const path = require('path');

const server = express();

// 处理静态资源
server.use(express.json())
server.use(express.static(path.join(__dirname, 'build')))

server.use(express.urlencoded({urlencoded: false, extended: true}))

server.get('/api/homead', (req, res)=>{
    const homeAdData = require('./home/ad');
    if (homeAdData) {
        res.json(homeAdData)
    } else {
        res.json({
            msg: 'Missing homead data...',
            code: -1,
            data: null
        })
    }
})

server.use('/api/homelist/:city/:page', (req, res)=>{
    const {city, page} = req.params;
    const homeListData = require('./home/list.js')
    if (homeListData) {
        res.json(homeListData);
    } else {
        res.json({
            msg: 'Missing homelist data...',
            status: -1,
            data: null
        })
    }
})

server.get('/api/orderlist/:username', (req, res)=>{
    // const {username} = this.params
    const  orderList = require('./orderlist/orderList.js');
    if (orderList) {
        res.json(orderList);
    } else {
        res.json({
            msg: 'Missing orderlist data...',
            status: -1,
            data: null
        })
    }
})

server.post('/api/submitComment', (req, res)=>{
    res.json({
        errno: 0,
        msg: 'ok'
    })
})

server.use('/api/search', (req, res)=>{
    var searchListData = require('./search/list.js');
    if (searchListData) {
        res.json(searchListData);
    } else {
        res.json({
            msg: 'Missing searchList data...',
            status: -1,
            data: null
        })
    }
})

server.use('/api/detail/info', (req, res)=>{
    const detailInfo = require('./detail/info.js')
    if (detailInfo) {
        res.json(detailInfo);
    } else {
        res.json({
            msg: 'Missing detailInfo data...',
            status: -1,
            data: null
        })
    }
})


server.use('/api/detail/comment', (req, res)=>{
    const detailComment = require('./detail/comment.js')
    if (detailComment) {
        res.json(detailComment);
    } else {
        res.json({
            msg: 'Missing detailComment data...',
            status: -1,
            data: null
        })
    }
})

server.use('/', (req, res)=>{
    res.sendFile(path.join(__dirname + 'build/index.html'))
})

server.listen('9000', (error)=>{
    if(!error){
        console.log('服务器启动成功');
    }else{
        console.log('服务器启动失败：');
        console.log(error);
    }
})