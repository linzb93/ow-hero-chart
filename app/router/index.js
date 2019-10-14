const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', res => {
  res.render('index');
});

router.get('getData', (req, res) => {});

router.post('/upload', (req, res) => {})