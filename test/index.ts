import { Elosnoc, Logger } from '../dist'
import * as R from 'ramda'

const logTest = (log: Logger<unknown>) => {
  log.debug('DEBUG')
  log.info('INFO')
  log.notice('NOTICE')
  log.warn('WARN')
  log.alert('ALERT')
  log.error('ERROR')
  log.critical('CRITICAL')
  log.emergency('EMERGENCY')
  log.warn([1, 'foo', { bar: 'baz' }])
}

const loggers = [
  Elosnoc(),
  Elosnoc({ logLevel: 'INFO' }),
  Elosnoc({
    logLevel: 'WARN',
    renderer: (level, content) => `nya~nya~☠️ ${level}! ${content}`,
    postHook: () => {
      console.log('meow!')
    },
  }),
]

R.map(logTest)(loggers)
