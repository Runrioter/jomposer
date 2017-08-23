const exec = require('child_process').exec;
const co = require('co');
const DataFetcher = require('./lib/data-fetcher');
const hashFile = require('./lib/hash-file');
const logger = require('./lib/logger');
const fs = require('fs');
const path = require('path');

const installComposer = (setUpFile) => {
  return (done) => {
    const installDir = path.join(__dirname, 'bin');
    exec(`php ${setUpFile} --install-dir=${installDir}`, (error, stdout, stderr) => {
      done(error, [stdout, stderr]);
    });
  };
}

co(function *() {
  const df = new DataFetcher();
  const setUpFile = yield df.downloadComposerInstaller();
  const currentSig = hashFile(setUpFile);
  const expectedSig = yield df.getComposerInstallerSignature();
  
  if (currentSig === expectedSig) {
    logger.info('Installer signatures matched successfully');
    try {
      logger.info('Downloading Composer...');
      const [outMsg, errMsg] = yield installComposer(setUpFile);
      if (outMsg) {
        //For example: Composer (version 1.5.1)
        const found = outMsg.match(/Composer (\(version \d+(\.\d)*\S*\))/);
        logger.info(`${found[0]} successfully installed`);
        logger.info(`Deleting Composer Installer`);
        fs.unlinkSync(setUpFile);
      } else if (errMsg) {
        logger.error(errMsg);
      }
    } catch(err) {
      logger.error(err.message);
      process.exit(1);
    }
  } else {
    logger.error('ERROR: Invalid installer signature');
    process.exit(1);
  }
}).catch(err => {
  logger.error(err.stack);
  process.exit(1);
});