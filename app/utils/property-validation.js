const {isEmpty, find} = require('lodash');
const chalk = require('chalk');
exports.assert = function(data, rules) {
  if (!data || isEmpty(data)) {
    console.log(chalk.red('请传入数据'));
    return;
  }
  if (!rules || (Array.isArray(rules) && !rules.length)) {
    console.log(chalk.red('请传入规则'));
    return;
  }
  const match = find(rules, item => {
    if (item.required) {
      return data[item.name] === null
      || data[item.name] === undefined
      || data[item.name] === ''
    } else if (item.min) {
      return isNaN(Number(data[item.name])) || Number(data[item.name]) < item.min;
    } else if (item.max) {
      return isNaN(Number(data[item.name])) || Number(data[item.name]) > item.max;
    } else if (typeof item.validate === 'function') {
      return !item.validate(data[item.name]);
    }
  });
  if (match) {
    return match.message;
  }
}