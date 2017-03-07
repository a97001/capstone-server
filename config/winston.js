const winston = require('winston');

const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			statusLevels: true,
			json: true,
			colorize: true,
			level: 'warn'
		}),
		new (winston.transports.File)({
			filename: 'error_log.json',
			statusLevels: true,
			level: 'warn'
		})
	]
});

module.exports = logger;
