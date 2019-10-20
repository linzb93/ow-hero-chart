const fs = require('fs-extra');
const path = require('path');
const {fixZero} = require('../utils');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

let schema = [];
fs.readFile(resolve('./app/utils/schema.json'), 'utf8')
.then(res => {
  schema = JSON.parse(res).data;
});

exports.getTypeList = () => {
  const data = schema.map(({id, name}) => ({id, name}));
  return Promise.resolve(data);
}

exports.getSubTypeList = type => {
  const ret = schema.filter(item => item.id === type)[0];
  return Promise.resolve(ret.children);
}

exports.getData = ({type, sub_type}) => {
  let data = {};
  return fs.readdir(resolve('./logs'))
  .then(retFiles => {
    const readFileList = [];
    const now = new Date();
    // 按日期筛选，筛选有数据的前10日
    if (retFiles.length > 1) {
      if (now.getMonth() === 0) {
        readFileList.push(`${now.getFullYear() - 1}-12`, `${now.getFullYear()}-01`);
      } else {
        readFileList.push(`${now.getFullYear()}-${fixZero(now.getMonth())}`, `${now.getFullYear()}-${now.getMonth() + 1}`);
      }
    } else {
      readFileList.push(`${now.getFullYear()}-${now.getMonth() + 1}`);
    }
    const pMap = readFileList.map(file => {
      return fs.readFile(resolve(`./logs/${file}.json`))
      .then(res => {
        const obj = JSON.parse(res);
        for (let key in obj) {
          data[key] = obj[key];
        }
        return Promise.resolve();
      });
    });
    return Promise.all(pMap);
  })
  .then(() => {
    let ret = [];
    if (Object.keys(data).length <= 10) {
      for (let i in data) {
        ret.push({
          date: i,
          value: data[i][type][sub_type]
        })
      }
    }
    return Promise.resolve(ret);
  })
};