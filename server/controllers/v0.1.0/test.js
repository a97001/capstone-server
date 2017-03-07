const co = require('co');
const mongoose = require('mongoose');
const config = require('../../../config/env');

module.exports = {
	test(req, res, next) {
		co(function* () {
			const mailOptions = {
				to: 'a97001@gmail.com',
				from: config.emailFrom
			};
			return res.status(200).json({});
		}).catch((err) => {
			next(err);
		});
	}
};
