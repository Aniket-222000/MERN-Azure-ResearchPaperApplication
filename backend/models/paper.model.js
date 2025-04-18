// src/models/paper.model.js
const { Schema, model } = require('mongoose');

const paperSchema = new Schema({
  title:           { type: String, required: true },
  authors:         { type: [String], required: true },
  abstract:        { type: String, required: true },
  keywords:        { type: [String], required: true },
  content:         { type: String, required: true },
  publicationDate: { type: Date,   default: Date.now },
  status:          { type: String, enum: ['draft','submitted','published','rejected'], default: 'draft' },
  fileUrl:         { type: String }
}, {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      // Rename _id to id and remove _id
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

// Create a virtual 'id' field (optional, since transform covers it)
paperSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Text index for searching
paperSchema.index({
  title: 'text',
  abstract: 'text',
  content: 'text',
  keywords: 'text',
  authors: 'text'
});

module.exports = model('Paper', paperSchema);
