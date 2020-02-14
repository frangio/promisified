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
  [K in KS]: 'promisify' | 'passthrough';
};

type PromisifiedModule<S extends Spec, M extends Record<keyof S, unknown>> = {
  [K in keyof S]: S[K] extends 'promisify' ? Promisified<M[K]> : M[K];
};

export function promisifyModule<S extends Spec, M extends Record<keyof S, unknown>>(mod: M, spec: S): PromisifiedModule<S, M> {
  const res: { [K in keyof S]: any } = {} as any;
  for (const key in spec) {
    if (key in res) {
      if (spec[key] === 'promisify') {
        res[key] = util.promisify(mod[key] as any);
      } else {
        res[key] = mod[key];
      }
    }
  }
  return res;
}
