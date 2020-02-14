import * as util from 'util';

type Promisified<F> =
  F extends util.CustomPromisify<infer TCustom>
    ? TCustom
    : PromisifiedRegular<F>;

import { List } from 'ts-toolbelt';

type PromisifiedRegular<F> =
  F extends (...args: infer Args) => unknown
    ? List.Last<Args> extends (err: any, result: infer TResult) => unknown
      ? (...args: List.Pop<Args>) => Promise<TResult>
      : never
    : never;

type Spec<KS extends string = string> = {
  [K in KS]: 'promisify';
};

type PromisifiedModule<S extends Spec, M extends Record<keyof S, unknown>> = {
  [K in keyof S]: Promisified<M[K]>;
};

function promisifyModule<S extends Spec, M extends Record<keyof S, unknown>>(mod: M, spec: S): PromisifiedModule<S, M> {
  const res: { [K in keyof S]: any } = {} as any;
  for (const key in spec) {
    res[key] = util.promisify(mod[key] as any);
  }
  return res;
}




import * as fs from 'fs';

const pfs = promisifyModule(fs, {
  readFile: 'promisify',
});

async function test() {
  const file1: Buffer = await pfs.readFile('file');
  const file2: string = await pfs.readFile('file', 'utf8');
}

export = pfs;
