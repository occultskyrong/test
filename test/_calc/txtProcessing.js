/**
 * Created by zhangrz on 2018/1/9.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/**
 * test.txt数据处理
 * 将test.txt数据转换为json数据存储
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const FileName = path.join(__dirname, './test1 .txt'); // txt文件名

let json = []; // 使用json存储数据
let lineNumber = 0; // 行数
const startLineNumber = 2; // 从第3行开始读取数据

/**
 * 转换行数据为json数据
 * @param {string} line
 */
function lineTransform(line) {
    const lineArr = line.split(' ');
    const keyArr = ['time', 'fx12', 'fx34', 'fy14', 'fy23', 'fz1', 'fz2', 'fz3', 'fz4'];
    const lineObj = {};
    for (let i = 0, len = keyArr.length; i < len; i++) {
        lineObj[keyArr[i]] = lineArr[i]; // 循环读取每个值
    }
    json.push(lineObj);
}

module.exports =()=> new Promise((resolve, reject)=> {
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
