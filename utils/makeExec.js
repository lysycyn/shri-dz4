const { exec } = require('child_process');
const config = require('../config');

/**
 * Выполнить команду через exec. Возвращает промис-обертка над функцией exec.
 * Обработка цепочек производится при вызове фукнции
 * @param {string} command
 * @returns {Promise}
 */
const makeExec = command => new Promise((resolve, reject) =>
  exec(command, { cwd: config.repo }, (error, stdout, stderr) => {
    if (error) {
      reject(stderr);
    }
    resolve(stdout);
  }));

module.exports = makeExec;
