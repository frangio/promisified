const util = require('util');

function promisified(mod, spec) {
  const res = Object.defineProperties({}, Object.getOwnPropertyDescriptors(mod));

  for (const key of spec) {
    if (res[key] !== undefined) {
      res[key] = util.promisify(mod[key]);
    }
  }

  return res;
}

module.exports = { promisified };
