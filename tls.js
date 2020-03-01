const { promisified } = require('./internal');
const tls = require('tls');

const ptls = promisified(tls, [
  'connect',
]);

module.exports = ptls;
