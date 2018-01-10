/**
 * Created by zhangrz on 2018/1/9.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const calc = require('./calc');
const writeCsv = require('./writeCsv');

/**
 * 小文件数据处理运行方法
 * 1、读取txt文件到内存A
 * 2、读取excel文件到内存B
 * 3、按行计算A、B结果,再次写入内存C
 * 4、将C写入到excel文件
 *
 */
function smallTxtRun() {
    const txtProcessing = require('./txtProcessing');
    const csvProcessing = require('./csvProcessing');
    let txtJson = [];
    let csvJson = [];
    let resultJson = [];
    txtProcessing()
        .then((result)=> {
            txtJson = result;
            return csvProcessing();
        })
        .then((result)=> {
            csvJson = result;
            for (let i = 0, len1 = txtJson.length, len2 = csvJson.length; i < len1 && i < len2; i++) {
                const txt = txtJson[i];
                const csv = csvJson[i];
                const calcResult = calc(txt, csv);
                resultJson.push(calcResult);
            }
            return writeCsv(resultJson);
        })
        .then(console.info)
        .catch(console.error);
}

smallTxtRun();
