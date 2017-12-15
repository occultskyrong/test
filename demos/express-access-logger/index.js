/**
 * Created by zhangrz on 2017/12/15.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';


/**
 * 基于log4js,绑定到express的日志文件中间件
 * @param {object} option 配置信息
 * @return {function(*, *, *)} 标准请求-响应拦截结构
 */
module.exports = (option)=> {
    option = getOption(option); // 获取配置信息
    let log = {};
    return (req, res, next)=> {
        log = {
            uuid: req.header(option.uuid),
            req: {
                originalUrl: req.originalUrl,
                query: req.query,
                body: req.body,
                params: req.params,
            },
        };
        option.log(log);
        next();
    };
};

// ———————— 调用函数置于底部,便于查看主要逻辑 ————————

/**
 * 检查并获取配置信息
 * @param {object} option 自定义配置
 * @return {object} 生成的配置信息
 */
function getOption(option) {
    let o = {};
    // 全局唯一标记
    if ('uuid' in option) {
        o.uuid = option.uuid;
    } else {
        o.uuid = 'uuid';
    }
    // 日志记录的方式
    if ('logType' in option) {
        const logType = option.logType;
        if (logType === 'console') {
            // o.log=console.log
        } else if (typeof logType === 'function') {

        } else if (1) {

        }
    } else {
        o.log = console.log; // 默认为控制台输出
    }
    return o;
}
