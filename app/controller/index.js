const save = require('../service/save');
const {formatRes} = require('../utils');
const { getTypeList, getSubTypeList} = require('../service/getType');
const getData = require('../service/getData');

exports.index = (req, res) => {
  res.render('index');
}

exports.upload = async (req, res) => {
  try {
    await save(req.body.data);
  } catch (e) {
    console.log(e);
  }
  res.send(formatRes(null, '本日数据保存成功'));
}

exports.getTypeList = async (req, res) => {
  const data = await getTypeList();
  res.send(formatRes(data));
}

exports.getSubTypeList = async (req, res) => {
  if (req.query && !req.query.type) {
    res.status(400).send(formatRes(null, '主类型不能为空'));
    return;
  }
  try {
    const ret = await getSubTypeList(req.query.type);
    res.send(formatRes(ret));
  } catch (e) {
    res.status(400).send(formatRes(null, '未找到主类型'));
  }
}

exports.getData = async (req, res) => {
  const {type, sub_type, time} = req.query;
  if (!type) {
    res.status(400).send(formatRes(false, null, '主类型不能为空'));
    return;
  }
  if (!sub_type) {
    res.status(400).send(formatRes(false, null, '子类型不能为空'));
    return;
  }
  // if (!['day', 'week', 'month'].includes(time)) {
  //   res.status(400).send(formatRes(false, null, '时间类型不正确'));
  //   return;
  // }
  const ret = await getData({type, sub_type});
  res.send(formatRes(ret));
}