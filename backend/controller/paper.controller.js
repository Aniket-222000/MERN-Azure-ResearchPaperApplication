const Paper = require('../models/paper.model');
const { uploadFile } = require('../services/blob.service');

async function createPaper(req, res, next) {
  try {
    const { title, authors, abstract, keywords, content, status } = req.body;
    let fileUrl;
    if (req.file) {
      fileUrl = await uploadFile(req.file.buffer, req.file.originalname);
    }
    const paper = await Paper.create({
      title,
      authors: JSON.parse(authors),
      abstract,
      keywords: JSON.parse(keywords),
      content,
      status,
      fileUrl
    });
    res.status(201).json(paper);
  } catch (err) {
    next(err);
  }
}

async function listPapers(req, res, next) {
  try {
    const papers = await Paper.find();
    res.json(papers);
  } catch (err) {
    next(err);
  }
}

async function getPaper(req, res, next) {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) return res.status(404).send('Not found');
    res.json(paper);
  } catch (err) {
    next(err);
  }
}

async function updatePaper(req, res, next) {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.fileUrl = await uploadFile(req.file.buffer, req.file.originalname);
    }
    const paper = await Paper.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(paper);
  } catch (err) {
    next(err);
  }
}

async function deletePaper(req, res, next) {
  try {
    await Paper.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function listPapers(req, res, next) {
    try {
      const { query } = req.query;
      const filter = query
        ? { $text: { $search: query } }
        : {};
      const papers = await Paper.find(filter);
      res.json(papers);
    } catch (err) {
      next(err);
    }
  }
  

module.exports = {
  createPaper,
  listPapers,
  getPaper,
  updatePaper,
  deletePaper
};
