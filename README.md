# Elosonc

A simple, light-weighted and highly-customizable logger system for javascript.

## Install

```bash
npm install elosonc
```

## Usage

```typescript
import { Elosonc } from 'elosonc'
const elosonc = Elosonc()
elosonc.info('💬YAHO!')
elosonc.warn('⚠️DANGER!')
elosonc.error('❌OH NO!')
elosonc.emergency('☠️KERNEL PANIC')
```

The log will be written to stdout if level is lower than WARN, and be written to stderr otherwise.

## API

#### Elosonc

```typescript
  function Elosonc(elosoncOptions?: ElosoncOptions): Logger;
```
Get the logger.

**Options**
```typescript
{
  /** Set Log Level. Default to 'DEBUG' */
  logLevel: LogLevel;
  /** Customize renderer, which will be use to render the content tox
   *  Use the default renderer when omitted
   * */
  renderer: (level: LogLevel, content: string) => string;
  /** Customize post hook. It will be run after each rendering
   *  (i.e. will not be run if the level of the log is lower than logLevel
   *  as in this case the log will not be rendered.) 
   * */
  postHook: (level: LogLevel, content: string. rendered: string) => void;
}
```

## LICENSE

Elosonc is licensed under LGPL-2.0.
