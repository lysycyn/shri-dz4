const { exec } = require('child_process');
const config = require('../config');

const makeExec = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, {cwd: config.repo}, (error, stdout, stderr) => {
          if (error) {
            reject({error, stderr});
          }
          resolve(stdout);
        });
    })
}

module.exports = makeExec;
