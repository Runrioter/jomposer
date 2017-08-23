'use strict';

const assert = require('assert');
const os = require('os');
const fs = require('fs');
const path = require('path');
const urllib = require('urllib');
const logger = require('./logger');
const packageInfo = require('../package.json');

module.exports = class DataFetcher {

  constructor(options) {
    options = options || {};
    this.name = options.name || packageInfo.name;
  }

  * getComposerInstallerSignature() {
    logger.info('Fetching install.sig')
    const result = yield urllib.request('https://composer.github.io/installer.sig', {
      dataType: 'text',
      followRedirect: true,
      timeout: 50000
    });
    assert(result.status === 200, `[${this.name}]`.red + 'fetch installer.sig failed');
    return result.data.trim();
  }

  * downloadComposerInstaller() {
    logger.info('Fetching Composer Installer');
    const result = yield urllib.request('https://getcomposer.org/installer', {
      dataType: 'text', followRedirect: true, timeout: 50000
    });
    assert(result.status === 200, `[${this.name}]`.red + 'fetch Composer Installer failed');
    const saveFile = path.join(__dirname, 'composer-setup.php');
    const writable = fs.createWriteStream(saveFile);
    fs.writeFileSync(saveFile, result.data, {encoding: 'utf8', mode: '0o644'})
    logger.info('Saving Composer Installer');
    return saveFile;
  }
}