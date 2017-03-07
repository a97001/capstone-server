const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * FsFile Schema
 */
const FsFileSchema = new Schema({
  filename: {
    type: String,
    required: 'File name is required'
  },
  length: {
    type: Number
  },
  contentType: {
    type: String
  },
  uploadDate: {
    type: Date
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

/**
 * @typedef FsFile
 */
module.exports = mongoose.model('FsFile', FsFileSchema, 'fs.files');
