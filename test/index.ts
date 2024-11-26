import { Elosnoc, Logger, vanilla, syslog, candy, gulp } from '../dist'
import * as R from 'ramda'

const logTest = (log: Logger<unknown>) => {
  log.debug('DEBUG')
  log.info('INFO')
  log.notice('NOTICE')
  log.warn('WARN')
  log.error('ERROR')
  log.critical('CRITICAL')
  log.alert('ALERT')
  log.emergency('EMERGENCY')
  log.info(1, 2, 3, 4, '5', [6, { foo: 'bar' }], { baz: 'bah' })
  log.warn([1, 'foo', { bar: 'baz' }])
}

const loggers = [
  Elosnoc(),
  Elosnoc({ logLevel: 'INFO', combinator: syslog(candy(gulp())) }),
  Elosnoc({
    logLevel: 'WARN',
    renderer: ({ level, content }) => `nya~nya~☠️ ${level}! ${content}`,
    postHook: () => {
      console.log('meow!')
    },
  }),
]

R.map(logTest)(loggers)
