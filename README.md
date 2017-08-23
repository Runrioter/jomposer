jomposer
=======

[![npm](https://img.shields.io/npm/v/jomposer.svg)](https://www.npmjs.com/package/jomposer)
[![npm](https://img.shields.io/npm/dt/jomposer.svg)](https://www.npmjs.com/package/jomposer)

:headphones: Talk to composer via npm

Jomposer will install `Composer` automatically.
Run `Composer` via npm script `jomposer`, so that you can use `npm` to run `Composer` easily.

## Requirements

The `php` executable must be available in PATH.

## Usage

#### Install

- Run `npm i -g jomposer` to install it as a global cli

- Run `npm i -D jomposer` to install it as `devDependencies`

#### Configuration

- Add `jomposer` to `package.json` in your project.

```diff
 "scripts": {
+  "jomposer": "jomposer",
   "test": "echo \"Error: no test specified\" && exit 1"
 },
```

#### Run Composer

- Run `npm run jomposer -- -v` to see version.

```
➜ npm run jomposer -- -v

> example@1.0.1 jomposer ***
> jomposer -v

   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 1.5.1 2017-08-09 16:07:22

Usage:
  command [options] [arguments]
  ...
```

- Run `npm run jomposer -- require monolog/monolog` to install php package.

```
➜ npm run jomposer -- require monolog/monolog

> example@1.0.1 jomposer ***
> jomposer "require" "monolog/monolog"
...
```
