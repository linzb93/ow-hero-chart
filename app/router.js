const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);
router.post('/upload', controller.upload);
router.get('/hero_list', controller.getHeroList);
router.get('/type_list', controller.getTypeList);
router.get('/sub_type_list', controller.getSubTypeList);
router.get('/get_data', controller.getData);

module.exports = router;