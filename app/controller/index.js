const save = require('../service/save');

exports.upload = async (req, res) => {
  await save(req.body);
  res.send('本日数据保存成功');
}

exports.subTypeList = (req, res) => {
  res.send(); 
}

exports.getData = (req, res) => {
  const {type, sub_type} = req.query;
  res.send();
}