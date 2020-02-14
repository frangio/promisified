import { promisifyModule } from './internal';

import fs from 'fs';

const pfs = promisifyModule(fs, {
  readFile: 'promisify',
  readFileSync: 'passthrough',
  Dir: 'passthrough',
  Dirent: 'passthrough',
  ReadStream: 'passthrough',
  Stats: 'passthrough',
  WriteStream: 'passthrough',
  access: 'promisify',
  accessSync: 'passthrough',
  appendFile: 'promisify',
  appendFileSync: 'passthrough',
});

export = pfs;

async function test() {
  const file1: Buffer = await pfs.readFile('file');
  const file2: string = await pfs.readFile('file', 'utf8');
  const file3: string = pfs.readFileSync('file', 'utf8');
}
