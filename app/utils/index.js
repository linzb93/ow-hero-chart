// 标准输出
exports.formatRes = (data, errMsg) => ({
  data,
  message: errMsg || ''
})

// 月日前面补0
exports.fixZero = num => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}

exports.dateFormat = (type = 'day', dateArg = new Date()) => {
  const year = dateArg.getFullYear();
  const month = dateArg.getMonth() + 1;
  const date = dateArg.getDate();
  if (type === 'month') {
    return `${year}-${fixZero(month)}`;
  }
  return `${year}-${fixZero(month)}-${fixZero(date)}`;
}