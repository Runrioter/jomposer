'use strict';

const crypto = require('crypto');
const fs = require('fs');

const hashFile = file => {
  const hash = crypto.createHash('sha384');
  hash.update(fs.readFileSync(file));
  return hash.digest('hex');
};

module.exports = hashFile;
