const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const featureCtrl = require('../../controllers/v0.1.0/feature');

// const router = express.Router();	// eslint-disable-line new-cap

module.exports = (app) => {
	app.route('/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId')
	/**
	* @api {get} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId Show feature detail
	* @apiVersion 0.1.0
	* @apiGroup Features
	*/
		.get(featureCtrl.showFeature)

	/**
	* @api {put} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId Update feature
	* @apiVersion 0.1.0
	* @apiGroup Features
	* @apiParam {String} [name] Feature Name
	* @apiParam {String} type Feature Type (only unclassified can change type)
	* @apiParam {Object} [metadata] Feature Metadata
	* @apiParam {Object} [loc] Feature position
	* @apiParam {ObjectId} [floor] New floor
	* @apiParam {ObjectId} [equipment] Equipment for equipemnt type feature
	* @apiParam {ObjectId} [senor] Sensor for sensor type feature
	* @apiParam {ObjectId} [meter] Meter for meter type feature
	* @apiParam {ObjectId} [location] Location for location type feature
	*/
		.put(validate(paramValidation.updateFeature), featureCtrl.updateFeature)

	/**
	* @api {delete} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId Delete feature
	* @apiVersion 0.1.0
	* @apiGroup Features
	*/
		.delete(featureCtrl.deleteFeature);

	app.param('featureId', featureCtrl.load);
};
