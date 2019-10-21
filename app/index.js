const express = require('express');
const app = express();
const mainRouter = require('./router');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const {formatRes} = require('./utils');
require('./service/errorHandler');
function haltOnTimedout (req, res, next) {
  if (!req.timedout) {
    next();
  }
}
app.set('views', './app/view');
app.set('view engine', 'ejs');
// 错误处理
app.use(timeout('3s'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/', mainRouter);
app.use(haltOnTimedout);
app.listen(3000, () => {
  console.log('服务器已启动');
});