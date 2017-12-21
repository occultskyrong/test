/**
 * Created by zhangrz on 2017/12/15.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express');
const expressAccessLogger = require('./index');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// ———————— 加入中间件 ——————————
app.use(expressAccessLogger()); // 默认参数
app.use(expressAccessLogger({ // 参数列表
    uuid: 'uuid', // 唯一标识符,用于全链路追踪;默认为uuid
    /**
     * 日志记录器,用于日志记录
     * 默认为console.log;
     * 可选参数:['console','log4js',[Function]]
     */
    logger: 'log4js',
    /**
     * log4js配置,logger为log4js时读取此参数
     * 默认为false,读取内置默认配置
     * 可选参数:[false,[Object]]
     */
    log4jsConfig: false,
    log4jsLogger: 'access', // log4js中logger的name,配置log4jsConfig时必须传入此参数;默认为access
    /**
     * token的的取值,从header中读取
     * 默认为authorization
     * 可选参数:[[Function],'authorization',false]
     * [Function] 回调,参数为req
     * false 关闭
     */
    token: 'authorization',
    // token: (req)=>req.header('authorization'),
}));


app.post('/test/:id', (req, res)=> {
    console.info('————————',
        'originalUrl:', req.originalUrl,
        'query:', req.query,
        'body:', req.body,
        'params:', req.params
    );
    res.json(true);
});

app.listen(3000, ()=> {
    console.info('------- 启动服务 -------');
});


/*
 * 测试说明
 * 浏览器中访问 POST localhost:3000/test/123?a=1 body={b:2}
 */