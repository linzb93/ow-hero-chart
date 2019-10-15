const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (_, res) => {
  res.render('index');
});

router.get('/get_data', (req, res) => {
  console.log(req.query);
  res.send('success');
});

router.post('/upload', (req, res) => {
  console.log(req.body);
  res.send('success');
});

module.exports = router;