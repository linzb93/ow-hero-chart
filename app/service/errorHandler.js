const app = require('express')();

process.on('uncaughtException', err => {
  console.log('uncaughtException');
  console.log(err);
});
process.on('unhandledRejection', err => {
  console.log('unhandledRejection');
  console.log(err);
})