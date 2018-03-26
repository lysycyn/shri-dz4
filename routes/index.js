const express = require('express');
const router = express.Router();
const makeExec = require('../utils/makeExec');
const config = require('../config');

router.get('/', (req, res, next) => {
    makeExec('git branch').then((stdout) => {
        const branches = stdout
            .split('\n')
            .slice(0, -1)
            .map(branch => branch.toString().replace('*', '').trim());
        const title = config.repo.slice(config.repo.lastIndexOf('\/')+1);
        res.render('index', { title, branches });
    });
});

module.exports = router;



// const getAllBranches = makeExecCommand(`cd ${config.repoPath} && git branch`);
// const getAllCommitsBranch = branch =>
//   makeExecCommand(`cd ${config.repoPath} && git log ${branch} --pretty=format:"%h - %s" | cat`);
// const getAllFiles = (path, param) =>
//   makeExecCommand(`cd ${config.repoPath} && git ls-tree ${param} ${path}/`);
// const getShowFile = (path, param, file) =>
//   makeExecCommand(`cd ${config.repoPath} && git show ${param}:./${clearStr(path, config.repoPath)}/${file} | cat`);
