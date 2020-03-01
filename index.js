const { promisified } = require('./internal');

const globals = {
  setTimeout: global.setTimeout,
  setImmediate: global.setImmediate,
};

const pglobals = promisified(globals, Object.keys(globals));

module.exports = pglobals;
