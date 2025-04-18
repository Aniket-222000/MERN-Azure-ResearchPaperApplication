const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer(); // in‑memory

const ctrl = require('../controller/paper.controller');

router.post('/', upload.single('file'), ctrl.createPaper);
router.get('/', ctrl.listPapers);
router.get('/:id', ctrl.getPaper);
router.put('/:id', upload.single('file'), ctrl.updatePaper);
router.delete('/:id', ctrl.deletePaper);

module.exports = router;
