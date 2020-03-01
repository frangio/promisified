const { promisified } = require('./internal');
const zlib = require('zlib');

const pzlib = promisified(zlib, [
  'brotliCompress',
  'brotliCompress',
  'brotliDecompress',
  'deflate',
  'deflateRaw',
  'gunzip',
  'gzip',
  'inflate',
  'inflateRaw',
  'unzip',
]);

module.exports = pzlib;
