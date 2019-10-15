// 标准输出
exports.formatRes = (success, data, errMsg) => ({
  success,
  data,
  message: errMsg || ''
})