const { promisified } = require('./internal');
const dgram = require('dgram');

const pdgram = promisified(dgram, [
  'createSocket',
]);

module.exports = pdgram;
