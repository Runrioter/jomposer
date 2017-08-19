'use strict';

const assert = require('assert');
const os = require('os');
const fs = require('fs');
const path = require('path');
const urllib = require('urllib');

require('colors');

module.exports = class DataFetcher {

  constructor(options) {
    options = options || {};
    this.name = options.name || 'jomposer';
  }

  * getComposerInstallerSignature() {
    this.info('Fetching install.sig')
    const result = yield urllib.request('https://composer.github.io/installer.sig', {
      dataType: 'text',
      followRedirect: true
    });
    assert(result.status === 200, `[${this.name}]`.red + 'fetch installer.sig failed');
    return result.data.trim();
  }

  * downloadComposerInstaller() {
    this.info('Fetching Composer Installer');
    const saveFile = path.join(os.tmpdir(), 'composer-setup.php');
    this.info(`Trying fetch Composer Installer`);
    const result = yield urllib.request('https://getcomposer.org/installer', {
      dataType: 'text', followRedirect: true, timeout: 50000
    });
    assert(result.status === 200, `[${this.name}]`.red + 'fetch Composer Installer failed');
    const writable = fs.createWriteStream(saveFile);
    fs.writeFileSync(saveFile, result.data, {encoding: 'utf8', mode: '0o644'})
    this.info(`Saving Composer Installer to ${saveFile}`);
    return saveFile;
  }

  error(msg) {
    const args = Array.prototype.slice.call(arguments);
    args[0] = `[${this.name}] `.red + args[0];
    console.log.apply(console, args);
  }

  info(msg) {
    const args = Array.prototype.slice.call(arguments);
    args[0] = `[${this.name}] `.green + args[0];
    console.log.apply(console, args);
  }

  log() {
    const args = Array.prototype.slice.call(arguments);
    args[0] = `[${this.name}] `.white + args[0];
    console.log.apply(console, args);
  }
}