const save = require('../service/save');
const {formatRes} = require('../utils');
const {assert} = require('../utils/property-validation');
const {getTypeList, getSubTypeList, getHeroList} = require('../service/getType');
const getData = require('../service/getData');

exports.index = (_, res) => {
  res.render('index');
}

exports.upload = async (req, res) => {
  const {data, hero} = req.body;
  try {
    await save(data, hero);
    formatRes(res, {
      data: null,
      message: '本日数据保存成功'
    });
  } catch (e) {
    formatRes(res, {
      error: 'server',
      message: e
    })
  }
}

exports.getHeroList = (_, res) => {
  formatRes(res, {
    data: getHeroList(),
    message: '获取成功'
  });
}

exports.getTypeList = async (req, res) => {
  const msg = assert(req.query, [
    {
      name: 'hero',
      required: true,
      message: '英雄不能为空'
    }
  ])
  if (msg) {
    formatRes(res, {
      error: 'client',
      message: msg
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
      error: 'server',
      message: e
    });
    return;
  }
}

exports.getSubTypeList = async (req, res) => {
  const msg = assert(req.query, [
    {
      name: 'hero',
      required: true,
      message: '英雄不能为空'
    },
    {
      name: 'type',
      required: true,
      message: '主类型不能为空'
    }
  ])
  if (msg) {
    formatRes(res, {
      error: 'client',
      message: msg
    });
    return;
  }
  const {hero, type} = req.query;
  try {
    const ret = await getSubTypeList({hero, type});
    formatRes(res, {
      data: ret
    })
  } catch (e) {
    formatRes(res, {
      error: 'server',
      message: e
    });
  }
}

exports.getData = async (req, res) => {
  const {hero, type, sub_type, time = 'day'} = req.query;
  const msg = assert(req.query, [
    {
      name: 'hero',
      required: true,
      message: '英雄不能为空'
    },
    {
      name: 'type',
      required: true,
      message: '主类型不能为空'
    },
    {
      name: 'sub_type',
      required: true,
      message: '子类型不能为空'
    },
    {
      name: 'time',
      validate(item) {
        return ['day', 'week'].includes(item);
      },
      message: '时间类型不正确'
    }
  ]);
  if (msg) {
    formatRes(res, {
      error: 'client',
      message: msg
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
    formatRes(res, {
      error: 'server',
      message: e
    });
  }
}