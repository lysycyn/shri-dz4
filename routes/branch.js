const express = require('express');

const router = express.Router();
const makeExec = require('../utils/makeExec');
const { getCommits } = require('../utils/helpers');

/**
 * Роутер для отображения коммитов выбранной ветки
 */
router.get('/:branch', (req, res) => {
  const { branch } = req.params;

  makeExec(`git log --pretty=format:"%h|%ad|%an|%s" --date=short ${decodeURIComponent(branch)}`)
    .then((data) => {
      const commits = getCommits(data);
      res.render('branch', { branch, commits });
    });
});

module.exports = router;
