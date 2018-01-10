/**
 * Created by zhangrz on 2018/1/9.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/**
 * csv数据处理
 * 将csv数据转换为json数据
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const FileName = path.join(__dirname, './2017-12-08 13-14-58.csv'); // csv文件名

let json = []; // 使用json存储数据
let lineNumber = 0; // 行数
const startLineNumber = 1; // 从第2行开始读取数据

/**
 * 转换行数据为json数据
 * @param {string} line
 */
function lineTransform(line) {
    const lineArr = line.split(',"');
    const keyArr = ['time', 'x', 'y', 'z'];
    const lineObj = {};
    for (let i = 0, len = keyArr.length; i < len; i++) {
        let val = lineArr[i];
        if (typeof val === 'string') {
            val = val.replace(/"/g, '');
            val = val.replace(/,/g, '.');
            lineObj[keyArr[i]] = parseFloat(val); // 循环读取每个值
        } else {
            lineObj[keyArr[i]] = val;
        }
    }
    // console.info(lineObj);
    json.push(lineObj);
}

module.exports = ()=> new Promise((resolve, reject)=> {
    const rl = readline.createInterface({
        input: fs.createReadStream(FileName),
        crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
        if (lineNumber++ >= startLineNumber) {
            lineTransform(line);
        }
    }).on('close', () => {
        resolve(json);
    });
});
