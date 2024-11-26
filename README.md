# Elosnoc

A simple, light-weighted and highly-customizable logger system for javascript.

## What's new

_Updated in v0.12.0_
- Now log function supports variadic parameters.
- Add the concepts of _Combinator_, which defines how to combine the rendered result from _Renderer_ to support variadic-parameters log function
- Add _Combinator generator_ `gulp`. 
- Update the implementation of `fancy`. Part of implementation of `fancy` is removed to preset _combinator wrapper_ `candy` in order to keep compatibility with variadic-parameters log function
- `syslog` is now a _combinator wrapper_ instead of _renderer wrapper_

_Updated in v0.11.0_

- Post-hook is always optional.
- Use bundler parameters for renderer, printer and post-hook 
- Default renderer is renamed to `fancy`
- Add a new renderer: `vanilla`. Just explore it:)
- Add a renderer wrapper `syslog` to generate logs that fit syslog protocol

_Updated in v0.10.0_

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
   *  Use the default renderer(fancy) when omitted
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

## Presets

Elosnoc provides some preset renderer, combinator generator and wrapper. It will by default use some of them, to provides a out-of-box experience.


#### fancy
- **Type: Renderer**
Render logs with some awesome styles.

#### gulp
- **Type: Combinator generator**
Join all strings rendered with the separator given

#### candy
- **Type: Combinator wrapper**
Adds timestamp info to the header of the log

#### syslog
- **Type: Combinator wrapper**
Adds syslog protocol code to the header of the log.

#### vanilla
- **Type: Renderer**
~~A powerful renderer that can implement highly-performance JavaScript~~

## LICENSE

Elosnoc is licensed under LGPL-2.1.
