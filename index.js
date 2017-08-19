const exec = require('child_process').exec;
const co = require('co');
const DataFetcher = require('./libs/data-fetcher');
const hashFile = require('./libs/hash-file');
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
    df.info('Installer signatures matched successfully');
    try {
      df.info('Downloading Composer...');
      const [outMsg, errMsg] = yield installComposer(setUpFile);
      if (outMsg) {
        //For example: Composer (version 1.5.1)
        const found = outMsg.match(/Composer (\(version \d+(\.\d)*\S*\))/);
        df.info(`${found[0]} successfully installed`);
        df.info(`Deleting Composer Installer`);
        fs.unlinkSync(setUpFile);
      } else if (errMsg) {
        df.error(errMsg);
      }
    } catch(err) {
      df.error(err.message);
      process.exit(1);
    }
  } else {
    df.error('ERROR: Invalid installer signature');
    process.exit(1);
  }
}).catch(err => {
  df.error(err.stack);
  process.exit(1);
});