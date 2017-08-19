#!/usr/bin/env node

'use strict';

const {spawn} = require('child_process');
const argv = process.argv;
const options = argv.slice(2);
const composer = spawn('php', ['./composer.phar'].concat(options));

const output = (data) => {
  console.log(data.toString())
}

composer.stdout.on('data', (data) => {
  output(data);
});

composer.stderr.on('data', (data) => {
  output(data);
});
