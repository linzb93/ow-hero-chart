const fs = require('fs-extra');
const path = require('path');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

(async () => {
  let res;
  try {
    res = await fs.readFile(resolve('./app/utils/schema.json'), 'utf8');
  } catch (e) {
    console.log(e);
    return;
  }
  schema = JSON.parse(res).data;
})();

let schema = [];
exports.getTypeList = () => {
  const data = schema.map(({id, name}) => ({id, name}));
  return Promise.resolve(data);
}

exports.getSubTypeList = type => {
  const ret = schema.filter(item => item.id === type)[0];
  return Promise.resolve(ret.children);
}