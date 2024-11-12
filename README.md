# Elosnoc

A simple, light-weighted and highly-customizable logger system for javascript.

## Install

```bash
npm install Elosnoc
```

## Usage

```typescript
import { Elosnoc } from 'Elosnoc'
const elosnoc = Elosnoc()
elosnoc.info('💬YAHO!')
elosnoc.warn('⚠️DANGER!')
elosnoc.error('❌OH NO!')
elosnoc.emergency('☠️KERNEL PANIC')
```

The log will be written to stdout if level is lower than WARN, and be written to stderr otherwise.

## API

#### Elosnoc

```typescript
  function Elosnoc(ElosnocOptions?: ElosnocOptions): Logger;
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

Elosnoc is licensed under LGPL-2.1.
