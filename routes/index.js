const express = require('express');

const router = express.Router();
const makeExec = require('../utils/makeExec');
const config = require('../config');

const { getBranchesFromString } = require('../utils/helpers');

/**
 * Роутер для отображения всех веток репозитория
 */
router.get('/', (req, res) => {
  makeExec('git branch').then((data) => {
    const branches = getBranchesFromString(data);
    const title = 'Branches';
    const h1 = config.repo.slice(config.repo.lastIndexOf('/') + 1);
    res.render('index', { title, h1, branches });
  }).catch(e => console.error(e)); //eslint-disable-line
});

module.exports = router;
