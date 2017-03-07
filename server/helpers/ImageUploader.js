const mongoose = require('mongoose');
const async = require('async');
const Grid = require('gridfs-stream');
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const _ = require('lodash');

const FsFile = require('../models/fsfile');

const ObjectId = mongoose.Types.ObjectId;
Grid.mongo = mongoose.mongo;
// console.log(mongoose.mongo);
let gfs = null;
mongoose.connection.once('open', () => {
  gfs = new Grid(mongoose.connection.db);
});

function removeFile(file, callback) {
  if (process.env.NODE_ENV === 'test') {
    callback();
  } else {
    fs.exists(file.path, (exists) => {
      if (exists) {
        fs.unlink(file.path, (err) => {
          callback();
        });
      } else {
        callback();
      }
    });
  }
}

function createImage(user, file, group, type, res, callback) {
  file.path = `/uploaded/files/${user.email}/${file.name}`;
  if (process.env.NODE_ENV === 'test') {
    file.path = `${__dirname}/../tests/testing_files/${file.name}`;
  }
  const imageTransformer = sharp().resize(640, 640).max().rotate().progressive().quality(80).toFormat('jpeg');
  const fileReadStream = fs.createReadStream(file.path);

  const gridFile = {
      filename: file.name,
      content_type: file.type,
      metadata: {
        uploader: user._id,
        type,
        desc: '',
        attribute: {}
      },
      mode: 'w'
  };
  const gridFSWriteStream = gfs.createWriteStream(gridFile);

  gridFSWriteStream.on('error', (err) => {
    removeFile(file, () => {
      console.log(err);
      return res.status(500).end();
    });
  });
  imageTransformer.on('error', (err) => {
    removeFile(file, () => {
      console.log(err);
      return res.status(500).end();
    });
  });
  fileReadStream.on('error', (err) => {
    removeFile(file, () => {
      console.log(err);
      return res.status(500).end();
    });
  });
  gridFSWriteStream.on('close', (fsFile) => {
    removeFile(file, () => {
      callback(fsFile);
    });
  });
  fileReadStream.pipe(imageTransformer).pipe(gridFSWriteStream);
  // fileReadStream.pipe(gridFSWriteStream);
}

module.exports = createImage;
