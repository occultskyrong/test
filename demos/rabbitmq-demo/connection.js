/**
 * Created by zhangrz on 2017/12/20.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const amqp = require('amqplib');
const config = require('./config');
const mqConfig = config.mq;

const connection = amqp.connect(`amqp://${mqConfig.account}:${mqConfig.password}@${mqConfig.host}`); // 建立连接

module.exports = connection;
