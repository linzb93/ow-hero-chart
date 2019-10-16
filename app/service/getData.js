const fs = require('fs-extra');
const path = require('path');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

exports.getSubTypeList = type => {
  return fs.readFile('../utils/schema.json', 'utf8')
  .then(res => {
    const data = JSON.parse(res);
    if (!data[type]) {
      return Promise.reject();
    }
    return Promise.resolve(data[type]);
  });
}

exports.getData = (type, sub_type) => {
  return fs.readdir(resolve('./logs'))
  .then(files => {
    let data = {};
    const pMap = files.map(file => {
      return fs.readFile(file)
      .then(res => {})
    });
    Promise.all(pMap)
    .then(resList => {})
  })
};