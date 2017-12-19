/**
 * Created by zhangrz on 2017/12/19.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express');
const request = require('request');
const app = express();

app.use('/*', (req, res)=> {
    req.pipe(request('http://w3.zaiyiqiba.com/love.php?make=2&id=85937')).pipe(res);
});

app.listen(15210, ()=> {
    console.info('———————— 启动成功 ————————');
});
