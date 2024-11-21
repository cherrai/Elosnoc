# Elosnoc

A simple, light-weighted and highly-customizable logger system for javascript.

## What's new

_Added in v0.10.0_

- Typescript enhancement: add support for customize the the type of the arguments of `renderer`
- Add support for customize the printer function
- Renderer and post-hook function now can read `logLevel`

## Install

```bash
npm install Elosnoc
```

## Basic Usage

```typescript
import { Elosnoc } from 'Elosnoc'
const elosnoc = Elosnoc()
elosnoc.info('💬YAHO!')
elosnoc.warn('⚠️DANGER!')
elosnoc.error('❌OH NO!')
elosnoc.emergency('☠️KERNEL PANIC')
```

## API

#### Elosnoc

```typescript
function Elosnoc<T = unknown, P = string>(ElosnocOptions?: ElosnocOptions<T, P>): Logger
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
  renderer: (level: LogLevel, content: T, logLevel: LogLevel) => P;
  /** Customize the printer. By default, the message will be written to stdout
   *  if level is lower than WARN, and be written to stderr otherwise. */
  printer: (level: LogLevel, rendered: P, logLevel: LogLevel) => void;
  /** Customize post hook. It will be run after each rendering
   *  (i.e. will not be run if the level of the log is lower than logLevel
   *  as in this case the log will not be rendered.)
   * */
  postHook: (level: LogLevel, content: T, rendered: P, logLevel: LogLevel) => void;
}
```

## LICENSE

Elosnoc is licensed under LGPL-2.1.
