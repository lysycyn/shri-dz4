const express = require('express');

const router = express.Router();
const makeExec = require('../utils/makeExec');
const { getCommitsFromString } = require('../utils/helpers');

/**
 * Роутер для отображения коммитов выбранной ветки
 */
router.get('/:branch', (req, res) => {
  const { branch } = req.params;

  makeExec(`git log --pretty=format:"%h|%ad|%an|%s" --date=short ${decodeURIComponent(branch)}`)
    .then((data) => {
      const title = 'Commits';
      const commits = getCommitsFromString(data);
      res.render('branch', { title, branch, commits });
    });
});

module.exports = router;
