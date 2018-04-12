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
        channel.assertExchange(ex, 'topic', {durable: false});
        setInterval(()=> {
            const str = `[${new Date()}] --- 消息`;
            console.info('发送消息:', str);
            channel.publish(ex, 'key.11', new Buffer(str), {
                headers: {
                    'auth-token': '测试',
                },
            });
        }, 1000);
    })
    .catch(console.error);
