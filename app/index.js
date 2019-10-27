const express = require('express');
const app = express();
const mainRouter = require('./router');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const detectPort = require('detect-port');
require('./service/uncaughtError');
function haltOnTimedout (req, res, next) {
  if (!req.timedout) {
    next();
  }
}
app.set('views', './app/view');
app.set('view engine', 'ejs');
// 超时处理
app.use(timeout('3s'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/', mainRouter);
app.use(haltOnTimedout);

(async () => {
  const port = await detectPort(3000);
  app.listen(port);
})();
