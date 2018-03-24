const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

function makeExecCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, {cwd: '/Users/strelok/projects/yandex/shri/dz4-6'}, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          }
          resolve({stdout, stderr});
        });
    })
}

/* GET home page. */
router.get('/', (req, res, next) => {
    makeExecCommand('git branch').then((pipe) => {
      console.log(pipe);
      res.render('index', { title: 'Express' });
    })
});

module.exports = router;
