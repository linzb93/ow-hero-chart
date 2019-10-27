const fs = require('fs-extra');
const path = require('path');
const {remove} = require('lodash');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

exports.getHeroList = () => {
  return [
    {
      name: '查莉娅',
      id: 'zarya'
    },
    {
      name: '路霸',
      id: 'roadhog'
    }
  ]
}

exports.getTypeList = async hero => {
  let schema = [];
  let file;
  try {
    file = await fs.readFile(resolve(`./app/schema/${hero}.json`), 'utf8');
  } catch (e) {
    return Promise.reject(e);
  }
  try {
    schema = JSON.parse(file).data;
  } catch (e) {
    return Promise.reject(e);
  }
  const data = schema.map(({id, name}) => ({id, name}));
  return Promise.resolve(data);
}

exports.getSubTypeList = async ({type, hero}) => {
  let schema = [];
  let file;
  try {
    file = await fs.readFile(resolve(`./app/schema/${hero}.json`), 'utf8');
  } catch (e) {
    return Promise.reject(e);
  }
  try {
    schema = JSON.parse(file).data;
  } catch (e) {
    return Promise.reject(e);
  }
  const ret = schema.filter(item => item.id === type)[0].children;
  let ret1;
  // 将“消灭与阵亡”合并成“K/D”
  if (ret.some(item => item.id === 'kill') && ret.some(item => item.id === 'die')) {
    ret1 = remove(ret, item => {item.id === 'kill' || item.id === 'die'});
    ret1.push({
      id: 'kd',
      name: 'K/D'
    });
  } else {
    ret1 = ret;
  }
  return Promise.resolve(ret1);
}