export function promisified<S extends string, M extends Record<S, unknown>>(mod: M, spec: S[]): PromisifiedModule<S, M>;

import { CustomPromisify } from 'util';

type PromisifiedModule<S extends string, M extends Record<S, unknown>> = {
  [K in keyof M]: K extends S ? Promisified<M[K]> : M[K];
};

type Promisified<F> =
  F extends CustomPromisify<infer TCustom>
    ? TCustom
    : PromisifiedRegular<F>;

type PromisifiedRegular<F> =
  F extends (...args: infer Args) => void
    ? Last<Args> extends (err: never, result: infer R) => void
      ? (...args: Pop<Args>) => Promise<R>
      : never
    : never;

type Last<L extends unknown[]> = {
  0: Head<L>;
  1: Last<Tail<L>>;
}[L extends ([] | [unknown]) ? 0 : 1];

type Pop<L extends unknown[]> = {
  0: L extends [unknown] ? [] : never;
  1: Pop<Tail<L>> extends infer T ? Cons<Head<L>, T> : never;
}[L extends ([] | [unknown]) ? 0 : 1];

type Head<L extends unknown[]> =
  ((...l: L) => unknown) extends ((h: infer H, ..._: never[]) => any) ? H : never;

type Tail<L extends unknown[]> =
  ((...l: L) => unknown) extends ((_: never, ...t: infer T) => any) ? T : never;

type Cons<H, T> =
  T extends unknown[]
    ? ((h: H, ...t: T) => unknown) extends ((...l: infer L) => unknown)
      ? L
      : never
    : never;
