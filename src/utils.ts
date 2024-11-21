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

export { KeyWithDefault }
