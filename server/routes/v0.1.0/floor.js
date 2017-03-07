const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const floorCtrl = require('../../controllers/v0.1.0/floor');

module.exports = (app) => {
	app.route('/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId')
	/**
	* @api {get} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId Show floor
	* @apiVersion 0.1.0
	* @apiGroup Floors
	*/
		.get(floorCtrl.show)

	/**
	* @api {put} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId *Update floor
	* @apiVersion 0.1.0
	* @apiGroup Floors
	* @apiPermission Internal Admin
	* @apiParam {String} name Floor Name
	*/
		.put(validate(paramValidation.updateFloor), floorCtrl.updateFloor);

	app.route('/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/tiles')
	/**
	* @api {put} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/tiles *Update floor tiles
	* @apiVersion 0.1.0
	* @apiGroup Floors
	* @apiPermission Internal Admin
	* @apiParam {String[]} uploadedDocs Uploaded zip
	* @apiParamExample {json} Input
	*    {
	*      "uploadedDocs": Array
	*    }
	*/
		.put(floorCtrl.updateFloorTiles);

	app.route('/asset/sites/:site/buildings/:buildingId/blocks/:block/floors/:floorId/tiles/:tileId/z/:z/x/:x/y/:y')
	/**
	* @api {get} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/tiles/:tileId/z/:z/x/:x/y/:y Show floor tile
	* @apiVersion 0.1.0
	* @apiGroup Floors
	*/
		.get(floorCtrl.showFloorTile);

	app.route('/asset/sites/:site/buildings/:buildingId/blocks/:block/floors/:floorId/feature-types/:featureType/features')
	/**
	* @api {post} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features Create floor feature
	* @apiVersion 0.1.0
	* @apiGroup Floors
	* @apiParam {Number[]} loc 唔撚記得有D咩
	*/
		.post(validate(paramValidation.createFloorFeature), floorCtrl.createFloorFeature)

	/**
	* @api {get} /asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features Show feature type features
	* @apiVersion 0.1.0
	* @apiGroup Floors
	*/
		.get(floorCtrl.showFeatureTypeFeatures);

	app.param('floorId', floorCtrl.load);
};
