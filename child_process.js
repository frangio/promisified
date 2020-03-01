const { promisified } = require('./internal');
const child_process = require('child_process');

const pchild_process = promisified(child_process, [
  'exec',
  'execFile',
]);

module.exports = pchild_process;
