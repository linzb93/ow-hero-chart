const save = require('../service/save');
const {formatRes} = require('../utils');
const {getTypeList, getSubTypeList} = require('../service/getType');
const getData = require('../service/getData');

exports.index = (_, res) => {
  res.render('index');
}

exports.upload = async (req, res) => {
  try {
    await save(req.body.data);
  } catch (e) {
    console.log(e);
  }
  formatRes(res, {
    data: null,
    message: '本日数据保存成功'
  });
}

exports.getTypeList = async (_, res) => {
  const data = await getTypeList();
  formatRes(res, {
    data,
    message: '获取成功'
  })
}

exports.getSubTypeList = async (req, res) => {
  if (req.query && !req.query.type) {
    formatRes(res, {
      error: 'client',
      message: '主类型不能为空'
    });
    return;
  }
  try {
    const ret = await getSubTypeList(req.query.type);
    formatRes(res, {
      data: ret
    })
  } catch (e) {
    formatRes(res, {
      error: 'client',
      message: '未找到主类型'
    });
  }
}

exports.getData = async (req, res) => {
  const {type, sub_type, time = 'day'} = req.query;
  if (!type) {
    formatRes(res, {
      error: 'client',
      message: '主类型不能为空'
    });
    return;
  }
  if (!sub_type) {
    formatRes(res, {
      error: 'client',
      message: '子类型不能为空'
    });
    return;
  }
  if (!['day', 'week'].includes(time)) {
    formatRes(res, {
      error: 'client',
      message: '时间类型不正确'
    });
    return;
  }
  let ret;
  try {
    ret = await getData({type, sub_type});
    formatRes(res, {
      data: ret
    });
  } catch (e) {
    console.log(e);
    formatRes(res, {
      message: 'error'
    });
  }
  
}