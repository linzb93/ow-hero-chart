const save = require('../service/save');
const {formatRes} = require('../utils');
const {getSubTypeList, getData} = require('../service/getData');

exports.index = (req, res) => {
  res.render('index');
}

exports.upload = async (req, res) => {
  await save(req.body.data);
  res.send(formatRes(null, '本日数据保存成功'));
}

exports.getSubTypeList = async (req, res) => {
  if (req.body && !req.body.type) {
    res.status(400).send(formatRes(null, '主类型不能为空'));
    return;
  }
  try {
    const ret = await getSubTypeList(req.body.type);
    res.send(formatRes(ret));
  } catch (e) {
    res.status(400).send(formatRes(null, '未找到主类型'));
  }
}

exports.getData = async (req, res) => {
  const {type, sub_type} = req.query;
  if (!type) {
    res.status(400).send(formatRes(false, null, '主类型不能为空'));
    return;
  }
  if (!sub_type) {
    res.status(400).send(formatRes(false, null, '子类型不能为空'));
    return;
  }
  const ret = await getData(type, sub_type);
  res.send(formatRes(true, ret));
}