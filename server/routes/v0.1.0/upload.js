const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const uploadCtrl = require('../../controllers/v0.1.0/upload');

module.exports = (app) => {
  app.route('/utility/uploads/document')
  /**
  * @api {get} /utility/uploads/document Get upload document
  * @apiVersion 0.1.0
  * @apiGroup Uploads
  */
    .get(uploadCtrl.getUploadDocument)

  /**
  * @api {post} /utility/uploads/document Post upload document
  * @apiVersion 0.1.0
  * @apiGroup Uploads
  */
    .post(uploadCtrl.postUploadDocument);

  app.route('/utility/uploads/document/thumbnail/:upload_document_name')
  /**
  * @api {get} /utility/uploads/document/thumbnail/:upload_document_name Get document thumbnail
  * @apiVersion 0.1.0
  * @apiGroup Uploads
  */
    .get(uploadCtrl.getDocThumbnail);

  app.route('/utility/uploads/document/:upload_document_name')
  /**
  * @api {get} /utility/uploads/document/:upload_document_name Get document
  * @apiVersion 0.1.0
  * @apiGroup Uploads
  */
    .get(uploadCtrl.getDoc)

  /**
  * @api {delete} /utility/uploads/document/:upload_document_name delete upload document
  * @apiVersion 0.1.0
  * @apiGroup Uploads
  */
    .delete(uploadCtrl.deleteUploadDocument);

  app.param('upload_document_name', uploadCtrl.filename);
};
