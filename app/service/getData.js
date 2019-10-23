const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const {fixZero} = require('../utils');

const MAX_DAY = 10; // 最多访问日期

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

module.exports = async ({type, sub_type, time = 'day'}) => {
  let data = {};
  let retFiles;
  try {
    retFiles = fs.readdir(resolve('./logs'));
  } catch (e) {
    return Promise.reject(e);
  }
  if (time === 'day') {
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
          res = await fs.readFile(resolve(`./logs/${file}.json`))
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
      // console.log(ret);
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
        ret = ret.reverse();
      }
      
      return Promise.resolve(ret);
    } else if (time === 'week') {
      const pMap = retFiles.map(async file => {
        let res;
        try {
          res = await fs.readFile(file)
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
      let ori = [];
      let ret = [];
      for (let key in data) {
        ori.push({
          date: key,
          value: data[key][type][sub_type]
        });
      }
      // 遍历结果数组
      let oriLength = ori.length;
      let pointer = moment(ori[0].date);
      let index = 0;
      let value = 0;
      while(index < oriLength) {
        let lastDayInWeek = pointer.add(7, 'd');
        while(moment(ori[index].date).isBefore(lastDayInWeek) && index < oriLength) {
          value = ori[index].value;
          index++;
        }
        if (index < oriLength) {
          index--;
        }
        ret.push({
          range: `${pointer.format('YYYY-MM-DD')}~${lastDayInWeek.format('YYYY-MM-DD')}`,
          value
        });
        pointer = lastDayInWeek;
      }
      return Promise.resolve(ret);
    }
  };