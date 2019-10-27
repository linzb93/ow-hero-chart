const {errorLogger} = require('../utils');

process.on('uncaughtException', err => {
  errorLogger(err);
});
process.on('unhandledRejection', err => {
  errorLogger(err);
})