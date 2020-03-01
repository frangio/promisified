const { promisified } = require('./internal');
const cluster = require('cluster');

const pcluster = promisified(cluster, [
  'disconnect',
]);

module.exports = pcluster;
