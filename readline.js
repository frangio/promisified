const { promisified } = require('./internal');
const readline = require('readline');

const preadline = promisified(readline, [
  'clearLine',
  'clearScreenDown',
  'cursorTo',
  'moveCursor',
]);

module.exports = preadline;
