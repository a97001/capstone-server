const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const tileCtrl = require('../../controllers/v0.1.0/tile');

const router = express.Router();	// eslint-disable-line new-cap

router.route('/storage/v1/tiles/error')
/**
* @api {get} /storage/tiles/error Show error tile
* @apiVersion 0.1.0
* @apiGroup Tiles
*/
  .get(tileCtrl.showErrorTile);

module.exports = router;
