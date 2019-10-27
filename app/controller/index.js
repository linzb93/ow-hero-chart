const save = require('../service/save');
const {formatRes} = require('../utils');
const {getTypeList, getSubTypeList, getHeroList} = require('../service/getType');
const getData = require('../service/getData');

exports.index = (_, res) => {
  res.render('index');
}

exports.upload = async (req, res) => {
  const {data, hero} = res.body;
  try {
    await save(data, hero);
  } catch (e) {
    console.log(e);
  }
  formatRes(res, {
    data: null,
    message: '本日数据保存成功'
  });
}

exports.getHeroList = (_, res) => {
  formatRes(res, {
    data: getHeroList(),
    message: '获取成功'
  })
}

exports.getTypeList = async (_, res) => {
  if (req.query && !req.query.hero) {
    formatRes(res, {
      error: 'client',
      message: '英雄不能为空'
    });
    return;
  }
  try {
    const data = await getTypeList(req.query.hero);
    formatRes(res, {
      data,
      message: '获取成功'
    })
  } catch (e) {
    formatRes(res, {
      error: 'server'
    });
    return;
  }
}

exports.getSubTypeList = async (req, res) => {
  const {hero, type} = req.query;
  if (!hero) {
    formatRes(res, {
      error: 'client',
      message: '英雄不能为空'
    });
    return;
  }
  if (!type) {
    formatRes(res, {
      error: 'client',
      message: '主类型不能为空'
    });
    return;
  }
  try {
    const ret = await getSubTypeList({hero, type});
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
  const {hero, type, sub_type, time = 'day'} = req.query;
  if (!hero) {
    formatRes(res, {
      error: 'client',
      message: '英雄不能为空'
    });
    return;
  }
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
    ret = await getData({hero, type, sub_type, time});
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