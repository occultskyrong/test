/**
 * Created by zhangrz on 2018/1/9.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/**
 * 运算方法
 */

// 常量
const a = 60;
const b = 78.5;
const m = 747.73;
const n = 801.07;
const p = 214.22;

/**
 * 加法运算
 * @param {number} args
 * @return {number} sum
 */
function add(...args) {
    let sum = 0;
    const len = args.length;
    for (let i = 0; i < len; i++) {
        sum += parseFloat(args[i]);
    }
    return sum;
}

/**
 * 运算函数
 * @param {object} txt txt中json数据
 * @param {object} csv csv中json数据
 * @return {{}}
 */
function calc(txt, csv) {
    const {x, y, z}=csv;
    // console.info(txt, csv);
    const fx = add(txt.fx12, txt.fx34);
    const fy = add(txt.fy14, txt.fy23);
    const fz = add(txt.fz1, txt.fz2, txt.fz3, txt.fz4);
    const mx = -y * (p - z)
        - add(txt.fz1, txt.fz4) * (y - n - a)
        - add(txt.fz2, txt.fz3) * add(y - n, a);
    const my = x * (p - z)
        + add(txt.fz1, txt.fz2) * (x - m - b)
        + add(txt.fz3, txt.fz4) * add(x - m, b);
    const mz = txt.fx12 * (y - add(n, a))
        + txt.fx34 * add(y - n, a)
        + txt.fy14 * (add(m, b) - x)
        - txt.fy23 * add(x - m, b);

    const obj = {
        fx, fy, fz, mx, my, mz,
    };
    let result = {};
    Object.keys(obj).forEach((key)=> {
        result[key] = parseFloat(parseFloat(obj[key]).toFixed(6));
    });

    return result;
}

module.exports = calc;
