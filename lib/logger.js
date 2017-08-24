'use strict';

const packageInfo = require('../package.json');

require('colors');

const error = (...args) => {
  args[0] = `[${packageInfo.name}] `.red + args[0];
  console.log.apply(console, args);
};

const info = (...args) => {
  args[0] = `[${packageInfo.name}] `.green + args[0];
  console.log.apply(console, args);
};

const log = (...args) => {
  args[0] = `[${packageInfo.name}] `.white + args[0];
  console.log.apply(console, args);
};

module.exports = {
  error,
  info,
  log,
};
