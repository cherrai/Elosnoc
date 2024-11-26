/**
 * `KeyWithDefault<'foo',string,string> -> {'foo'?:string}`
 *
 * `KeyWithDefault<'bar',string,number> -> {'bar':string}`
 */
type KeyWithDefault<K extends string, T, P> = T extends P
  ? P extends T
    ? { [k in K]?: T }
    : { [k in K]: T }
  : { [k in K]: T }

/**
 * ```typescript
 * ParametersBundler<[string, number, {bah: bigint}],['foo','bar','baz']>
 * ```
 * =========>
 * ```typescript
 * {
 *   foo: string,
 *   bar: number,
 *   baz: {bah: bigint}
 * }
 * ```
 */
type ParametersBundler<P extends any[], K extends string[]> = P extends [infer PX, ...infer PXS]
  ? K extends [infer KX, ...infer KXS]
    ? KX extends string
      ? KXS extends string[]
        ? { [k in KX]: PX } & ParametersBundler<PXS, KXS>
        : never
      : never
    : never
  : {}

type FunctionParametersBundler<F extends (...args: any[]) => any, K extends string[]> = ParametersBundler<
  Parameters<F>,
  K
>

export { KeyWithDefault, ParametersBundler, FunctionParametersBundler }
