const { promisified } = require('./internal');

const stream = require('stream');

// TODO: Remove this explicit type annotation. It was the only way to get it to
// compile, but it looks like a TypeScript bug.
/**
 * @type import('./internal').PromisifiedModule<'finished' | 'pipeline', typeof import("stream")>
 */
const pstream = promisified(stream, [
  'finished',
  'pipeline',
]);

module.exports = pstream;
