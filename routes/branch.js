const express = require('express');
const router = express.Router();
const makeExec = require('../utils/makeExec');

router.get('/:branch', (req, res, next) => {
    const { branch } = req.params;

    makeExec(`git log --pretty=format:"%h|%ad|%an|%s" --date=short ${branch}`)
      .then((data) => {
        console.log(data);
        const commits = data.replace('*', '').split('\n').map(commit => {
            const commitSplit = commit.split('|');
            return {
              hash: commitSplit[0],
              date: commitSplit[1],
              author: commitSplit[2],
              message: commitSplit[3],
            };
        });
        res.render('branch', { branch, commits });
    });
});
module.exports = router;
