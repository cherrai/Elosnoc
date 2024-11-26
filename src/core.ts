import * as R from 'ramda'
import { candy, fancy, gulp, pandora } from './preset.js'
import { FunctionParametersBundler, KeyWithDefault } from './utils.js'

enum LogLevelEnum {
  EMERGENCY,
  ALERT,
  CRITICAL,
  ERROR,
  WARN,
  NOTICE,
  INFO,
  DEBUG,
}

const LOG_LEVELS = ['EMERGENCY', 'ALERT', 'CRITICAL', 'ERROR', 'WARN', 'NOTICE', 'INFO', 'DEBUG'] as const
const LOG_LEVELS_1 = ['emergency', 'alert', 'critical', 'error', 'warn', 'notice', 'info', 'debug'] as const

type LogLevel = (typeof LOG_LEVELS)[number]
type LogLevel1 = (typeof LOG_LEVELS_1)[number]

type RendererOptions<T = unknown> = {
  level: LogLevel
  content: T
  logLevel: LogLevel
}

type CombinatorOptions<P> = {
  level: LogLevel
  rendered: P[]
  logLevel: LogLevel
}

type PrinterOptions<K> = {
  level: LogLevel
  output: K
  logLevel: LogLevel
}

type PostHookOptions<T = string, K = string> = {
  level: LogLevel
  contents: T[]
  output: K
  logLevel: LogLevel
}

type Renderer<T = unknown, P = string> = (renderOptions: RendererOptions<T>) => P
type Combinator<P = string, K = string> = (combinatorOptions: CombinatorOptions<P>) => K
type Printer<P = string> = (printerOptions: PrinterOptions<P>) => void
type PostHook<T = unknown, K = string> = (postHookOptions: PostHookOptions<T, K>) => void

type ElosnocOptions<T = unknown, P = string, K = string> = {
  logLevel?: LogLevel
  postHook?: PostHook<T, K>
} & KeyWithDefault<'printer', Printer<P>, Printer<string>> &
  KeyWithDefault<'renderer', Renderer<T, P>, Renderer<unknown, string>> &
  KeyWithDefault<'combinator', Combinator<P, K>, Combinator<string, string>>

type LogFunction<T> = (...contents: T[]) => void
type Logger<T> = Record<LogLevel1, LogFunction<T>>

const Elosnoc = <T = unknown, P = string, K = string>(ElosnocOptions?: ElosnocOptions<T, P, K>): Logger<T> => {
  const logLevel = ElosnocOptions?.logLevel || 'DEBUG'
  const renderer = (ElosnocOptions?.renderer || fancy) as Renderer<T, P>
  const combinator = (ElosnocOptions?.combinator || candy(gulp())) as Combinator<P, K>
  const printer = (ElosnocOptions?.printer || pandora) as Printer<K>
  const postHook = (ElosnocOptions?.postHook || (() => {})) as PostHook<T, K>

  const getEntry = (level: LogLevel) => {
    const level1 = level.toLowerCase() as LogLevel1
    return [
      level1,
      (...contents: T[]) => {
        const output = R.pipe(
          R.map((content: T) => ({ level, content, logLevel })),
          R.map(renderer),
          (rendered: P[]) => ({
            rendered,
            level,
            logLevel,
          }),
          combinator
        )(contents)
        printer({ level, output, logLevel })
        postHook({ level, contents, output, logLevel })
      },
    ] as [LogLevel1, LogFunction<T>]
  }
  return R.pipe(R.map(getEntry), R.fromPairs)(LOG_LEVELS)
}

const logLevelToEnum = (logLevel: LogLevel) => LOG_LEVELS.findIndex((x) => x === logLevel) as LogLevelEnum

export {
  Elosnoc,
  Combinator,
  CombinatorOptions,
  ElosnocOptions,
  Logger,
  LogLevel,
  LogLevel1,
  Renderer,
  PostHook,
  Printer,
  LogLevelEnum,
  logLevelToEnum,
  LOG_LEVELS,
  LOG_LEVELS_1,
}
