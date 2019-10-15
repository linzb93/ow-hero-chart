const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

module.exports = data => {
  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const curMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
  
  fs.readFile(`${resolve(`logs/${curMonth}.json`)}`, 'utf8')
  .then(str => {
    const target = JSON.parse(str);
    target[today] = data;
    return fs.writeFile(`logs/${curMonth}.json`, prettier.format(JSON.stringify(target), {
      parser: 'json'
    }));
  })
  .catch(err => {
    if (err.code === 'ENOENT') {
      return fs.writeFile(`logs/${curMonth}.json`, prettier.format(JSON.stringify({
        [today]: data
      }), {
        parser: 'json'
      }));
    }
  });
}