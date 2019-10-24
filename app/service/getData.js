const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const {fixZero} = require('../utils');

const MAX_DAY = 10; // 最多访问日期

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

module.exports = async ({type, sub_type, time = 'day'}) => {
  let db = {};
  let AllFiles;
  try {
    AllFiles = fs.readdir(resolve('./logs'));
  } catch (e) {
    return Promise.reject(e);
  }
  let filterFileList = [];
  if (time === 'day') {
    // 按日搜索，选择最近两个月的最近10天数据，最多10天。
    const now = new Date();
    if (AllFiles.length > 1) {
      if (now.getMonth() === 0) {
        filterFileList.push(`${now.getFullYear() - 1}-12`, `${now.getFullYear()}-01`);
      } else {
        filterFileList.push(`${now.getFullYear()}-${fixZero(now.getMonth())}`, `${now.getFullYear()}-${now.getMonth() + 1}`);
        }
      } else {
        filterFileList.push(`${now.getFullYear()}-${now.getMonth() + 1}`);
      }
  } else if (time === 'week') {
    filterFileList = AllFiles;
  }
  // 整合选中文件的数据
  const pMap = filterFileList.map(async file => {
    let contentStr;
    try {
      contentStr = await fs.readFile(resolve(`./logs/${file}.json`))
    } catch (e) {
      return  Promise.reject(e);
    }
    let content;
    try {
      content = JSON.parse(contentStr);
    } catch(e) {
      return Promise.reject(e);
    }
    for (let key in content) {
      db[key] = obj[key];
    }
    return Promise.resolve();
  });
  try {
    await Promise.all(pMap);
  } catch (e) {
    return Promise.reject(e);
  }
  let ret = [];
  if (time === 'day') {
    if (Object.keys(db).length <= MAX_DAY) {
      for (let i in db) {
        ret.push({
          date: i,
          value: db[i][type][sub_type]
        });
      }
    } else {
      // 从最近日期往前数10天
      let counter = 0;
      let curDay = moment();
      while(counter < MAX_DAY) {
        while(!db[curDay.format('YYYY-MM-DD')]) {
          curDay = curDay.subtract(1, 'd');
        }
        ret.push({
          date: curDay.format('YYYY-MM-DD'),
          value: db[curDay.format('YYYY-MM-DD')][type][sub_type]
        });
        curDay = curDay.subtract(1, 'd');
        counter++;
      }
      ret = ret.reverse();
    }
  } else if (time === 'week') {
    let tempList = [];
    for (let key in db) {
      tempList.push({
        date: key,
        value: db[key][type][sub_type]
      });
    }
    /**
     * 用两个指针的方式遍历数组，取每周最后一天的数据。
     * 如果本周没有数据，就沿用上周的。
     */
    let pointer = moment(tempList[0].date);
    let index = 0;
    let value = 0;
    while(index < tempList.length) {
      let lastDayInWeek = pointer.add(7, 'd');
      while(moment(tempList[index].date).isBefore(lastDayInWeek) && index < tempList.length) {
        value = tempList[index].value;
        index++;
      }
      if (index < tempList.length) {
        index--;
      }
      ret.push({
        range: `${pointer.format('YYYY-MM-DD')}~${lastDayInWeek.format('YYYY-MM-DD')}`,
        value
      });
      pointer = lastDayInWeek;
    }
  }
  return Promise.resolve(ret);
};