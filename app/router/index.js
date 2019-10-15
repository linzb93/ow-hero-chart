const express = require('express');
const router = express.Router();
const controller = require('../controller');
router.get('/', controller.index);
router.post('/upload', controller.upload);
router.get('/sub_type_list', controller.subTypeList);
router.get('/get_data', controller.getData);
module.exports = router;