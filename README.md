# jomposer
:headphones: Talk to composer via npm

## Requirements

The `php` executable must be available in PATH.

## Usage

#### Install

Run `npm i -D jomposer`

#### Add `jomposer` to `package.json` in your project.

```diff
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
+  "jomposer": "jomposer -v"
 },
```

#### Use npm to run Composer

Run `npm run jomposer`
```
➜ npm run jomposer

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
