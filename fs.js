const { promisified } = require('./internal');
const fs = require('fs');

const pfs = promisified(fs, [
  'readFile',
  'access',
  'appendFile',
]);

module.exports = pfs;
