const { promisified } = require('./internal');
const http = require('http');

const phttp = promisified(http, [
  'get',
  'request',
]);

module.exports = phttp;
