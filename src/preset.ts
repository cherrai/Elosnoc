import { LogLevel, Printer, Renderer, logLevelToEnum, LogLevelEnum, Combinator } from './core.js'
import { IFont, font } from 'terminal-font'

const styleMap: Record<LogLevel, IFont> = {
  ALERT: font().red(),
  CRITICAL: font().red(),
  DEBUG: font().white(),
  EMERGENCY: font().red(),
  ERROR: font().red(),
  INFO: font().green(),
  NOTICE: font().green(),
  WARN: font().yellow(),
}

const myToString = (x: unknown) => {
  return typeof x === 'object' ? JSON.stringify(x, null, 2) : `${x}`
}

const pandora: Printer<string> = ({ level, output, logLevel }) => {
  const level2 = logLevelToEnum(level)
  const logLevel2 = logLevelToEnum(logLevel)
  const stdout = level2 <= LogLevelEnum.WARN ? process.stderr : process.stdout

  level2 <= logLevel2 &&
    (() => {
      stdout.write(output)
      stdout.write('\n')
    })()
}

/**A renderer that be able to implement highly-performance JavaScript */
const vanilla: Renderer<unknown, string> = ({ content }) => `${myToString(content)}`

/**A render using some awesome styles */
const fancy: Renderer<unknown, string> = ({ level, content }) => styleMap[level].apply(`${myToString(content)}`)

/**A combinator generator joining string using separator */
const gulp: (separator?: string) => Combinator<string, string> =
  (separator) =>
  ({ rendered }) =>
    rendered.join(separator || ' ')

/**A combinator wrapper that adds timestamp */
const candy: <P>(source: Combinator<P, string>) => Combinator<P, string> =
  (source) =>
  ({ rendered, level, logLevel }) =>
    styleMap[level].apply(`${new Date().toLocaleString('ja-jp')} ${level}] ${source({ rendered, level, logLevel })}`)

/**A combinator wrapper that adds syslog protocol code */
const syslog: <P>(source: Combinator<P, string>) => Combinator<P, string> =
  (source) =>
  ({ level, rendered, logLevel }) =>
    `<${logLevelToEnum(level)}>${source({ level, rendered, logLevel })}`

export { fancy, pandora, gulp, candy, vanilla, syslog }
