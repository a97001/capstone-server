const async = require('async');
const co = require('co');
const config = require('../../../config/env');
const staticInfo = require('../../helpers/staticInfo');
const mongoose = require('mongoose');

const objectId = mongoose.Types.ObjectId;

module.exports = {
	/**
	 * Language list
	 */
	languageList(req, res, next) {
		co(function* () {
      return res.json(staticInfo.languageList());
		}).catch((err) => {
			next(err);
		});
	},

	/**
	 * Sensor type list
	 */
	sensorTypeList(req, res, next) {
		co(function* () {
			return res.json(staticInfo.sensorTypeList());
		}).catch((err) => {
			next(err);
		});
	},

	/**
	 * Meter type list
	 */
	meterTypeList(req, res, next) {
		co(function* () {
			return res.json(staticInfo.meterTypeList());
		}).catch((err) => {
			next(err);
		});
	},

	/**
	 * Parameter category list
	 */
	parameterCategoryList(req, res, next) {
		co(function* () {
			return res.json(staticInfo.parameterCategoryList);
		}).catch((err) => {
			next(err);
		});
	},

	/**
	 * Negaport agent list
	 */
	negaportAgentList(req, res, next) {
		co(function* () {
			return res.json(staticInfo.negaportAgentList);
		}).catch((err) => {
			next(err);
		});
	},

	/**
	 * Device list
	 */
	deviceList(req, res, next) {
		co(function* () {
			return res.json(staticInfo.deviceList);
		}).catch((err) => {
			next(err);
		});
	},

	/**
	 * Permission list
	 */
	permissionList(req, res, next) {
		co(function* () {
			return res.json(staticInfo.permissionList(__dirname));
		}).catch((err) => {
			next(err);
		});
	}
};
