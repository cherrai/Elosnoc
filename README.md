# Elosnoc

A simple, light-weighted and highly-customizable logger system for javascript.

## What's new

_Updated in v0.13.0_

- Add new API `hookNativeConsole`
- Fixes the format of combinator `fancy`
- Optimize the logic of the log function: now renderer, combinator and post-hook function will only be executed when needed

_Updated in v0.12.0_

- Now log function supports variadic parameters
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
npm install elosnoc
```

## Basic Usage

```typescript
import { Elosnoc } from 'elosnoc'
const elosnoc = Elosnoc()
elosnoc.info('💬YAHO!')
elosnoc.warn('⚠️DANGER!')
elosnoc.error('❌OH NO!')
elosnoc.emergency('☠️KERNEL PANIC')
```

## API

#### Elosnoc

```typescript
function Elosnoc<T = unknown, P = string, K = string>(ElosnocOptions?: ElosnocOptions<T, P>): Logger
```

Get the logger.

**Options**

- **`logLevel`**
  Set the `logLevel`, default to `'DEBUG'`

- **`renderer`**
  Customize the renderer, default to `fancy`

- **`combinator`**
  Customize the combinator, default to `candy(gulp())`

- **`printer`**
  Customize the printer, default to `pandora`

- **`postHook`**
  Customize the post-hook, default to `()=>{}` (do nothing)

#### hookNativeConsole

```typescript
function hookNativeConsole: (logger: Logger<any>) => (hooks: LogLevel2[]) => void;
```

Install hooks into native `console` object using the log function from `logger`.

## Presets

Elosnoc provides some preset renderer, combinator generator and wrapper. It will by default use some of them, to provides a out-of-box experience.

#### fancy

_Type: Renderer_

Render logs with some awesome styles.

#### gulp

_Type: Combinator generator_

Join all strings rendered with the separator given

#### candy

_Type: Combinator wrapper_

Adds timestamp info to the header of the log

#### syslog

_Type: Combinator wrapper_

Adds syslog protocol code to the header of the log.

#### vanilla

_Type: Renderer_

~~A powerful renderer that can implement highly-performance JavaScript~~

## LICENSE

Elosnoc is licensed under LGPL-2.1.
