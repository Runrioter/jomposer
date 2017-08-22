jomposer
=======
:headphones: Talk to composer via npm

Jomposer will install `Composer` automatically.
Run `Composer` via npm script `jomposer`, so that you can use `npm` to run `Composer` easily.

[![NPM](https://nodei.co/npm/jomposer.png?downloads=true)](https://nodei.co/npm/jomposer/)

## Requirements

The `php` executable must be available in PATH.

## Usage

#### Install

- Run `npm i -g jomposer` to install it as a global cli

- Run `npm i -D jomposer` to install it as `devDependencies`

#### Add `jomposer` to `package.json` in your project.

```diff
 "scripts": {
+  "jomposer:version": "jomposer -v",
+  "jomposer": "jomposer",
   "test": "echo \"Error: no test specified\" && exit 1"
 },
```

#### Use npm to run Composer

Run `npm run jomposer:version`

```
➜ npm run jomposer:version

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

#### Install PHP Package

Run `npm run jomposer -- require monolog/monolog`

```
➜ npm run jomposer -- require monolog/monolog

> example@1.0.1 jomposer ***
> jomposer "require" "monolog/monolog"
...
```

