# Promisified Node.js

This is a simple module to save you from manually calling `util.promisify`.

For every Node.js module that contains async functions, there is an equivalent
module in `promisified` where those functions have been promisified using
`util.promisify`.

```js
const fs = require('promisified/fs');

async function main() {
  const data = await fs.readFile('data.txt', 'utf8');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
```

Note that in some cases there are already promisified versions built into
Node.js itself, such as [`fs.promises`], also available as
`require('fs/promises')` in Node.js v14. This package does not use those; it
always uses `util.promisify`.

[`fs.promises`]: https://nodejs.org/api/fs.html#fs_fs_promises_api
