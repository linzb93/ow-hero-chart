const fs = require('fs-extra');
const path = require('path');
function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

module.exports = data => {
  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const curMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
  
  fs.readFile(`${resolve(`db/${curMonth}.json`)}`, 'utf8')
  .then(str => {
    const target = JSON.parse(str);
    target[today] = data;
    return fs.writeFile(`db/${curMonth}.json`, JSON.stringify(target));
  })
  .catch(err => {
    console.log(err);
  });
}