/**
 * Created by zhangrz on 2018/1/9.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const fs = require('fs');

/**
 * 将json数据写入csv文件中
 * @param {Array} json json数据
 * @return {Promise}
 */
const writeCsv = (json)=>new Promise((resolve, reject)=> {
    let str = '"Time","-Fx 1+2","-Fx 3+4","-Fy 1+4","-Fy 2+3"' +
        ',"-Fz 1","-Fz 2","-Fz 3","-Fz 4"' +
        ',"ActPos_X","ActPos_Y","ActPos_Z"' +
        '," -Fx"," -Fy"," -Fz"' +
        '," -Mx"," -My"," -Mz"' +
        '\n';
    json.forEach((obj)=> {
        let lineStr = '';
        Object.keys(obj).forEach((key)=> {
            lineStr += obj[key] + ',';
        });
        lineStr = lineStr.slice(0, lineStr.length - 1);
        str += lineStr + '\n';
    });
    fs.writeFile('result.csv', str, (err)=> {
        if (err) {
            reject(err);
        } else {
            resolve('--- 写入完成 ---');
        }
    });
});

module.exports = writeCsv;
