var express = require('express');
var router = express.Router();
const makeExec = require('../utils/makeExec');

router.get('/:branch/:commit/path/:path?', function(req, res, next) {
    const { branch, commit, path } = req.params;

    if (path) {
      console.log('OK');
      makeExec(`git ls-tree ${commit} ${path}/`).then((data) => {
        console.log(data);
        // const tree = data.split('\n').slice(0, -1).map((row) => {
        //     const rowSplit = row.split(/[\s+,\t+]/);
        //     return {
        //       'type': rowSplit[1],
        //       'name': rowSplit[3],
        //     }
        // });
        // console.log(tree);
        // return res.render('tree', { branch, tree });
      }).catch((e) => {
        console.log(e);
      });
    }
    else {
      makeExec(`git ls-tree ${commit}`).then((data) => {
        console.log(data);
        const tree = data.split('\n').slice(0, -1).map((row) => {
            const rowSplit = row.split(/[\s+,\t+]/);
            return {
              'type': rowSplit[1],
              'name': rowSplit[3],
            }
        });
        console.log(tree);
        res.render('tree', { branch, tree, commit });
      });
    }


    // if (file) {
    //     return res.render('preview', {
    //         branch,
    //         breadCrumbs: await getBreadCrumbs(branch, file),
    //         fileContent: await getFileContent(file),
    //     });
    // }
    //
    // const fileHash = path || commit;
    // const breadCrumbs = path ? await getBreadCrumbs(commit, fileHash) : null;
    //
    // return res.render('files', {
    //     branch,
    //     breadCrumbs,
    //     commit: {
    //         name: await getCommitName(commit),
    //         hash: commit,
    //     },
    //     files: await getFiles(fileHash),
    // });
});

module.exports = router;
