import * as R from 'ramda'
import { defaultPrinter, defaultRenderer } from './preset.js'
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

type PostHookOptions<T = unknown, P = string> = {
  level: LogLevel
  content: T
  rendered: P
  logLevel: LogLevel
}

type PrinterOptions<P> = {
  level: LogLevel
  rendered: P
  logLevel: LogLevel
}

type Printer<P = string> = (printerOptions: PrinterOptions<P>) => void
type Renderer<T = unknown, P = string> = (renderOptions: RendererOptions<T>) => P
type PostHook<T = unknown, P = string> = (postHookOptions: PostHookOptions<T, P>) => void

type ElosnocOptions<T = unknown, P = string> = { logLevel?: LogLevel; postHook?: PostHook<T, P> } & KeyWithDefault<
  'printer',
  Printer<P>,
  Printer<string>
> &
  KeyWithDefault<'renderer', Renderer<T, P>, Renderer<unknown, string>>

type LogFunction<T> = (content: T) => void
type Logger<T> = Record<LogLevel1, LogFunction<T>>

const logLevelToEnum = (logLevel: LogLevel) => LOG_LEVELS.findIndex((x) => x === logLevel) as LogLevelEnum

const Elosnoc = <T = unknown, P = string>(ElosnocOptions?: ElosnocOptions<T, P>): Logger<T> => {
  const logLevel = ElosnocOptions?.logLevel || 'DEBUG'
  const printer = ElosnocOptions?.printer || (defaultPrinter as Printer<P>)
  const postHook = (ElosnocOptions?.postHook || (() => {})) as PostHook<T, P>
  const renderer = (ElosnocOptions?.renderer || defaultRenderer) as Renderer<T, P>

  const getEntry = (level: LogLevel) => {
    const level1 = level.toLowerCase() as LogLevel1
    return [
      level1,
      (content: T) => {
        const rendered = renderer({ level, content, logLevel })
        printer({ level, rendered, logLevel })
        postHook({ level, content, rendered, logLevel })
      },
    ] as [LogLevel1, LogFunction<T>]
  }
  return R.pipe(R.map(getEntry), R.fromPairs)(LOG_LEVELS)
}

export {
  Elosnoc,
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
