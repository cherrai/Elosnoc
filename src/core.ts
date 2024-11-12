import * as R from 'ramda'
import { defaultRenderer } from './defaultRenderer.js'

enum LogLevelEnum {
  DEBUG,
  INFO,
  NOTICE,
  WARN,
  ERROR,
  CRITICAL,
  ALERT,
  EMERGENCY,
}

const LOG_LEVELS = ['DEBUG', 'INFO', 'NOTICE', 'WARN', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY'] as const
const LOG_LEVELS_1 = ['debug', 'info', 'notice', 'warn', 'error', 'critical', 'alert', 'emergency'] as const

type LogLevel = (typeof LOG_LEVELS)[number]
type LogLevel1 = (typeof LOG_LEVELS_1)[number]

type Renderer = (level: LogLevel, content: string) => string
type PostHook = (level: LogLevel, content: string, rendered: string) => void

type ElosnocOptions = {
  renderer?: Renderer
  logLevel?: LogLevel
  postHook?: PostHook
}

type LogFunction = (content: string) => void
type Logger = Record<LogLevel1, LogFunction>

const logLevelToEnum = (logLevel: LogLevel) => LOG_LEVELS.findIndex((x) => x === logLevel) as LogLevelEnum

const Elosnoc = (ElosnocOptions?: ElosnocOptions): Logger => {
  const logLevel = logLevelToEnum(ElosnocOptions?.logLevel || 'DEBUG')
  const renderer = ElosnocOptions?.renderer || defaultRenderer;
  const postHook = ElosnocOptions?.postHook || (() => {})
  const getEntry = (level: LogLevel) => {
    const level1 = level.toLowerCase() as LogLevel1
    const level2: LogLevelEnum = logLevelToEnum(level)
    const stdout = level2 >= LogLevelEnum.WARN ? process.stderr : process.stdout
    return [
      level1,
      (content: string) => {
        level2 >= logLevel &&
          (() => {
            const rendered = renderer(level, content)
            stdout.write(rendered);
            stdout.write('\n');
            postHook(level, content, rendered)
          })();
      },
    ] as [LogLevel1, LogFunction]
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
  LogLevelEnum,
  logLevelToEnum,
  LOG_LEVELS,
  LOG_LEVELS_1,
}
