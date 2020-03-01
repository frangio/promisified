const { promisified } = require('./internal');
const https = require('https');

const phttps = promisified(https, [
  'get',
  'request',
]);

module.exports = phttps;
