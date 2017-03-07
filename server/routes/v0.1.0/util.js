const paramValidation = require('../../../config/param-validation');
const utilCtrl = require('../../controllers/v0.1.0/util');
const validate = require('express-validation');

// const router = express.Router();	// eslint-disable-line new-cap

module.exports = (app) => {
  app.route('/utility/language-list')
  /**
  * @api {get} /utility/language-list Language list
  * @apiVersion 0.1.0
  * @apiGroup Utility
  */
    .get(utilCtrl.languageList);

  app.route('/utility/sensor-type-list')
  /**
  * @api {get} /utility/sensor-type-list Sensor type list
  * @apiVersion 0.1.0
  * @apiGroup Utility
  */
    .get(utilCtrl.sensorTypeList);

  app.route('/utility/meter-type-list')
  /**
  * @api {get} /utility/meter-type-list Meter type list
  * @apiVersion 0.1.0
  * @apiGroup Utility
  */
    .get(utilCtrl.meterTypeList);

  app.route('/utility/parameter-category-list')
  /**
  * @api {get} /utility/parameter-category-list Parameter category list
  * @apiVersion 0.1.0
  * @apiGroup Utility
  */
    .get(utilCtrl.parameterCategoryList);

  app.route('/utility/negaport-agent-list')
  /**
  * @api {get} /utility/negaport-agent-list Negaport agent list
  * @apiVersion 0.1.0
  * @apiGroup Utility
  */
    .get(utilCtrl.negaportAgentList);

  app.route('/utility/device-list')
  /**
  * @api {get} /utility/device-list Device list
  * @apiVersion 0.1.0
  * @apiGroup Utility
  */
    .get(utilCtrl.deviceList);

  app.route('/utility/permission-list')
  /**
  * @api {get} /utility/permission-list Permission list
  * @apiVersion 0.1.0
  * @apiGroup Utility
  */
    .get(utilCtrl.permissionList);
};
