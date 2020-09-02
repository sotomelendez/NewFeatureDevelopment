let express = require('express');
let router = express.Router();

let fileWorker = require('../controllers/file.controller.js');

// router.get('/api/file/all', fileWorker.listUrlFiles);
// router.get('/api/file/page', fileWorker.listUrlFilesPaged);

router.get('/api/file/all', fileWorker.listUrlFiles);
router.get('/api/file/page', fileWorker.getFilesPage);
router.get('/api/file/pageByType', fileWorker.getFilesPageByType);

router.get('/api/file/:filename', fileWorker.downloadFile);
 
module.exports = router;