const fs = require('fs-extra');
const path = require('path');

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

exports.getData = ({type, sub_type, time}) => {
  return fs.readdir(resolve('./logs'))
  .then(files => {
    const now = new Date();
    const readFileList = [];
    /**
     * 时间类型：
     * day: 取最近10天数据
     * week: 取最近6周数据
     * month: 取最近4月数据
     */
    switch (time) {
      case 'date':
        readFileList.push();
        break;
      case 'week':
        readFileList.push();
        break;
      case 'month':
        readFileList.push();
        break;
      default:
        break;
    }
    let data = {};
    const pMap = readFileList.map(file => {
      return fs.readFile(file)
      .then(res => {
        const obj = JSON.parse(res);
        for (let key in obj) {
          data[key] = obj[key];
        }
        return Promise.resolve();
      });
    });
    Promise.all(pMap)
    .then(resList => {})
  })
};