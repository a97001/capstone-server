const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const testCtrl = require('../../controllers/v0.1.0/test');

module.exports = (app) => {
  app.route('/test')
    .get(testCtrl.test)
    .post(testCtrl.test);

  app.route('/test/EMSCloud/DataUpload')
    .get(testCtrl.test)
    .post(testCtrl.test);
};
