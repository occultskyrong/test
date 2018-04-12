/**
 * Created by zhangrz on 2018/3/22.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

const express = require('express');
const expressAccessLogger = require('express-access-logger');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.raw());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(expressAccessLogger({
    logger: 'log4js', // 建议配置
    appKey: '', // 最低配置
    debug: false,
}));

app.all('/*', (req, res) => {
    console.info(`---- ${req.method} - ${JSON.stringify(req.body)}`);
    res.json({ success: true });
});

app.listen(3001, () => {
    console.info('------- 启动服务 -------');
    console.info('----- 请求:http://localhost:3001 查看后端日志');
});
