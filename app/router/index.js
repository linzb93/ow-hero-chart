const express = require('express');
const router = express.Router();
const controller = require('../controller');
router.get('/', (_, res) => {
  res.render('index');
});
router.post('/upload', (req, res) => {
  controller.upload(req, res);
});
router.get('/sub_type_list', (req, res) => {
  controller.subTypeList(req, res);
});
router.get('/get_data', (req, res) => {
  controller.getData(req, res);
});
module.exports = router;