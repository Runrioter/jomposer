const crypto = require('crypto');
const fs = require('fs');

const hash_file = (file) => {
  const hash = crypto.createHash('sha384');
  hash.update(fs.readFileSync(file));
  return hash.digest('hex');
}

module.exports = hash_file;