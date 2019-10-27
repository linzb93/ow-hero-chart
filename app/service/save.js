const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const cheerio = require('cheerio');
const moment = require('moment');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

const filterData = async (str, hero) => {
  const $ = cheerio.load(str);
  let file;
  try {
    file = await fs.readFile(resolve(`./app/schema/${hero}.json`), 'utf8');
  } catch (e) {
    return Promise.reject(e);
  }
  let schema;
  try {
    schema = JSON.parse(file).data;
  } catch (e) {
    return Promise.reject(e);
  }
  const ret = {};
  $('tbody tr').each(function() {
    const name = $(this).find('td').first().text();
    const value = $(this).find('td').last().text();
    for (let type = 0; type < schema.length; type++) {
      let children = schema[type].children;
      for (let sub_type = 0; sub_type < children.length; sub_type++) {
        if (name === children[sub_type].name) {
          if (!ret[schema[type].id]) {
            ret[schema[type].id] = {};
          }
          ret[schema[type].id][children[sub_type].id] = value;
        }
      }
    }
  });
  return ret;
}

module.exports = async (str, hero) => {
  const today = moment().format('YYYY-MM-DD');
  const curMonth = moment().format('YYYY-MM');
  let data;
  let file;
  try {
    data = await filterData(str, hero)
  } catch (e) {
    return Promise.reject(e);
  }
  fs.access()
  try {
    file = await fs.readFile(`${resolve(`logs/${curMonth}.json`)}`, 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.writeFile(`logs/${curMonth}.json`, '');
    }
  }
  let target;
  try {
    target = JSON.parse(file);
  } catch (e) {
    return Promise.reject(e);
  }
  if (!target[today]) {
    target[toady] = {};
  }
  target[today][hero] = data;
  return fs.writeFile(`logs/${curMonth}.json`, prettier.format(JSON.stringify(target), {
    parser: 'json'
  }));
}