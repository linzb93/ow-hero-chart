const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const cheerio = require('cheerio');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

const filterData = str => {
  const $ = cheerio.load(str);
  return fs.readFile('../utils/schema.json', 'utf8')
  .then(file => {
    const schema = JSON.parse(file);
    const ret = {};
    $('tbody tr').each(function() {
      const name = $(this).find('td').first().text();
      const value = $(this).find('td').last().text();
      for (let type in schema) {
        let temp = schema[type];
        for (let sub_type = 0; sub_type < temp.length; sub_type++) {
          if (name === temp[sub_type].name) {
            if (!ret[type]) {
              ret[type] = {};
            }
            ret[type][sub_type] = value;
            break;
          }
        }
      }
    });
    return ret;
  });
}

module.exports = async str => {
  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const curMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
  const data = await filterData(str);
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