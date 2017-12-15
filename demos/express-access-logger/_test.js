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

app.use(bodyParser.urlencoded({extended: true}));
// 加入中间件
app.use(expressAccessLogger({}));

app.get('/test/:id', (req, res)=> {
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
