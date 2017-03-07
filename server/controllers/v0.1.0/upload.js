const async = require('async');
const fs = require('fs');
const blueimpUploader = require('../../helpers/blueimp-file-upload-expressjs');
const mongoose = require('mongoose');
const config = require('../../../config/env');

const uploaderOptions = {
  tmpDir: '',
  uploadDir: '',
  uploadUrl: '/v0.1.0/upload/document/',
  useSSL: true,
  copyImgAsThumb: false,
  imageVersions: {
    width: 100,
    height: 'auto'
  },
  storage: {
    type: 'local'
  }
};

const objectId = mongoose.Types.ObjectId;

module.exports = {
  /**
  * Filename param
  */
  filename(req, res, next, filename) {
    req.filename = filename;
    next();
  },

 /**
 * get document
 */
  getDoc(req, res) {
    const options = {
      root: `/uploaded/files/${req.me.email}/`,
      dotfiles: 'deny'
    };
    res.sendFile(req.filename, options, (err) => {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
  },

  /**
   * get document thumbnail
   */
  getDocThumbnail(req, res) {
    const options = {
      root: `/uploaded/files/${req.me.email}/thumbnail/`,
      dotfiles: 'deny'
    };
    res.sendFile(req.filename, options, (err) => {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
  },

/**
 * get upload document
 */
  getUploadDocument(req, res) {
    uploaderOptions.tmpDir = `/uploaded/tmp/${req.me.email}`;
    uploaderOptions.uploadDir = `/uploaded/files/${req.me.email}`;
    const uploader = blueimpUploader(uploaderOptions);
    uploader.get(req, res, (obj) => {
      res.send(JSON.stringify(obj));
    });
  },

  /**
   * post upload document
   */
  postUploadDocument(req, res) {
    uploaderOptions.tmpDir = `/uploaded/tmp/${req.me.email}`;
    uploaderOptions.uploadDir = `/uploaded/files/${req.me.email}`;
    const uploader = blueimpUploader(uploaderOptions);
    uploader.post(req, res, (obj) => {
      res.send(JSON.stringify(obj));
    });
  },

  /**
   * delete upload document
   */
  deleteUploadDocument(req, res) {
    uploaderOptions.tmpDir = `/uploaded/tmp/${req.me.email}`;
    uploaderOptions.uploadDir = `/uploaded/files/${req.me.email}`;
    const uploader = blueimpUploader(uploaderOptions);
    uploader.delete(req, res, (obj) => {
      res.send(JSON.stringify(obj));
    });
  }
};

function removeAllFiles(files, email, callback) {
  async.each(files, (file, callback) => {
    fs.exists(`/uploaded/files/${email}/${file.name}`, (fileExists) => {
      if (fileExists) {
        fs.unlink(`/uploaded/files/${email}/${file.name}`, (err) => {
          fs.exists(`/uploaded/files/${email}/thumbnail/${file.name}`, (thumbnailExists) => {
            if (thumbnailExists) {
              fs.unlink(`/uploaded/files/${email}/thumbnail/${file.name}`, (err) => {
                callback(err);
              });
            } else {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    });
  }, (err) => {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

function removeFile(email, fileName, callback) {
  fs.exists(`/uploaded/files/${email}/${fileName}`, (fileExists) => {
    if (fileExists) {
      fs.unlink(`/uploaded/files/${email}/${fileName}`, (err) => {
        fs.exists(`/uploaded/files/${email}/thumbnail/${fileName}`, (thumbnailExists) => {
          if (thumbnailExists) {
            fs.unlink(`/uploaded/files/${email}/thumbnail/${fileName}`, (err) => {
              callback(err);
            });
          } else {
            callback(err);
          }
        });
      });
    } else {
      callback();
    }
  });
}
