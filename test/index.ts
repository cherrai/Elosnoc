import { Elosonc, Logger } from '../dist'
import * as R from 'ramda'

const logTest = (log: Logger) => {
  log.debug('DEBUG')
  log.info('INFO')
  log.notice('NOTICE')
  log.warn('WARN')
  log.alert('ALERT')
  log.error('ERROR')
  log.critical('CRITICAL')
  log.emergency('EMERGENCY')
}

const loggers = [
  Elosonc(),
  Elosonc({ logLevel: 'INFO' }),
  Elosonc({
    logLevel: 'WARN',
    renderer: (level, content) => `nya~nya~${level}! ${content}`,
    postHook: () => {
      console.log('meow!')
    },
  }),
]

R.map(logTest)(loggers)
