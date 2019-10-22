const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const {fixZero} = require('../utils');

const MAX_DAY = 10; // 最多访问日期
const MAX_WEEK = 6; // 最多访问周
const MAX_MONTH = 6; // 最多访问月份

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

module.exports = async ({type, sub_type}) => {
  let data = {};
  let retFiles;
  try {
    retFiles = fs.readdir(resolve('./logs'));
  } catch (e) {
    return Promise.reject(e);
  }
  const readFileList = [];
  const now = new Date();
  if (retFiles.length > 1) {
    if (now.getMonth() === 0) {
      readFileList.push(`${now.getFullYear() - 1}-12`, `${now.getFullYear()}-01`);
    } else {
      readFileList.push(
        `${now.getFullYear()}-${fixZero(now.getMonth())}`,
        `${now.getFullYear()}-${now.getMonth() + 1}`
      );
    }
  } else {
    readFileList.push(`${now.getFullYear()}-${now.getMonth() + 1}`);
  }
  const pMap = readFileList.map(async file => {
    let res;
    try {
      res = fs.readFile(resolve(`./logs/${file}.json`))
    } catch (e) {
      return  Promise.reject(e);
    }
    const obj = JSON.parse(res);
    for (let key in obj) {
      data[key] = obj[key];
    }
    return Promise.resolve();
  });
  try {
    await Promise.all(pMap);
  }catch (e) {
    return Promise.reject(e);
  }
  let ret = [];
  if (Object.keys(data).length <= MAX_DAY) {
    for (let i in data) {
      ret.push({
        date: i,
        value: data[i][type][sub_type]
      });
    }
  } else {
    let counter = 0;
    let curDay = moment();
    while(counter < MAX_DAY) {
      while(!data[curDay.format('YYYY-MM-DD')]) {
        curDay = curDay.subtract(1, 'd');
      }
      ret.push({
        date: curDay.format('YYYY-MM-DD'),
        value: data[curDay.format('YYYY-MM-DD')][type][sub_type]
      });
      curDay = curDay.subtract(1, 'd');
      counter++;
    }
  }
  return Promise.resolve(ret.reverse());
};