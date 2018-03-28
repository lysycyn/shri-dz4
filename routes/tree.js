const express = require('express');

const router = express.Router();
const makeExec = require('../utils/makeExec');
const { getFileNameFromPath, getTree, getBreadcrumbs } = require('../utils/helpers');

/**
 * Роутер для отображения файлов, директорий и просмотра содержимого файла
 * По умолчанию показывается содержимое корня репозитория.
 * В зависимости от параматра path в ссылке будет отображаться содержимое соответствующей директории
 * Для отображения файла (Используется view file.pug) в ссылке выставляется флаг file в query
 */
router.get('/:branch/:commit/:path?', (req, res) => {
  const { branch, commit, path } = req.params;
  const isFile = req.query.file === '';

  // если выставлен флаг file, то отобразить вьюху file
  // если в параметрах урла содержится путь до поддериктории,
  // вывести её содержимое и соответствующие крошки
  // По умолчанию отобразить файлы и директории корня репозитория
  if (isFile) {
    makeExec(`git show ${branch}:${path} | cat`).then((data) => {
      const decodePath = decodeURIComponent(path);
      const fileName = getFileNameFromPath(decodePath);
      const breadcrumbs = getBreadcrumbs(decodePath).slice(0, -1);
      res.render('file', {
        branch, commit, fileName, data, breadcrumbs,
      });
    });
  } else if (path) {
    makeExec(`git ls-tree ${commit} ${decodeURIComponent(path)}/`).then((data) => {
      const tree = getTree(data);
      const breadcrumbs = getBreadcrumbs(path);
      res.render('tree', {
        branch, tree, breadcrumbs, commit,
      });
    }).catch((e) => {
      console.error(e); // eslint-disable-line
    });
  } else {
    makeExec(`git ls-tree ${commit}`).then((data) => {
      const tree = getTree(data);
      res.render('tree', {
        branch, tree, commit,
      });
    }).catch((e) => {
      console.error(e); // eslint-disable-line
    });
  }
});

module.exports = router;
