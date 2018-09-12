#!/usr/bin/env node

'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const argv = process.argv;
const options = argv.slice(2);
const realpath = fs.realpathSync(__filename);
const composerExecFile = path.resolve(realpath, '../composer.phar');
const composer = spawn('php', [ composerExecFile ].concat(options));

const output = data => {
  console.log(data.toString());
};

composer.stdout.on('data', output);

composer.stderr.on('data', output);
