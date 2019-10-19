const fs = require('fs-extra');
const path = require('path');

let schema = [];
fs.readFile(resolve('./app/utils/schema.json'), 'utf8')
.then(res => {
  schema = JSON.parse(res).data;
})

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

exports.getTypeList = () => {
  const data = schema.map(({id, name}) => ({id, name}));
  return Promise.resolve(data);
}

exports.getSubTypeList = type => {
  const ret = schema.filter(item => item.id === type)[0];
  return Promise.resolve(ret.children);
}

exports.getData = (type, sub_type) => {
  return fs.readdir(resolve('./logs'))
  .then(files => {
    let data = {};
    const pMap = files.map(file => {
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