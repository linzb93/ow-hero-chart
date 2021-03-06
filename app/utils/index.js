const PrettyError = require('pretty-error');
const pe = new PrettyError();

// 标准输出
exports.formatRes = (res, {
  error,
  data,
  message
}) => {
  if (error === 'client') {
    res.status(400).send({
      data: null,
      message
    });
  } else if (error === 'server') {
    res.status(500).send({
      data: null,
      message: '服务器故障，请稍后再试！'
    });
    this.errorLogger(message);
  } else {
    res.send({
      data,
      message
    });
  }
}

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

exports.errorLogger = err => {
  console.log(pe.render(err));
}