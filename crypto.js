const { promisified } = require('./internal');
const crypto = require('crypto');

const pcrypto = promisified(crypto, [
  'generateKeyPair',
  'pbkdf2',
  'randomBytes',
  'randomFill',
  'scrypt',
]);

module.exports = pcrypto;
