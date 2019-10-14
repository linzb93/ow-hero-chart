const express = require('express');
const app = express();
const mainRouter = require('./router');

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use('/', mainRouter);
app.listen(3000, () => {
  console.log('服务器已启动');
});