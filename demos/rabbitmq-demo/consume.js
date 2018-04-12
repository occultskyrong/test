/**
 * Created by zhangrz on 2017/12/20.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const connection = require('./connection');

connection
    .then((conn)=>conn.createChannel()) // 创建频道
    .then((channel)=> {
        const ex = 'cloud_shop_stock_dev';
        channel.assertExchange(ex, 'topic', {durable: false}); // 注册交换线路
        console.info('---- 注册线路 ----');
        const routerArr = ['key.*'];
        channel.assertQueue('', {exclusive: true})
            .then((q)=> { // 注册队列
                console.info('—————— 监听消息 ————————');
                routerArr.forEach((key)=> { // 绑定多组队列
                    channel.bindQueue(q.queue, ex, key); // 绑定队列
                });
                channel.consume(q.queue, (msg)=> {
                    console.info(msg)
                    console.info('收到消息:', msg.fields.routingKey, msg.content.toString());
                }, {noAck: true});
            })
            .catch((err)=>console.error(err));
    })
    .catch(console.error);
