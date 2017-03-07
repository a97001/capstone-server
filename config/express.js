const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const winstonInstance = require('./winston');
const models = require('../server/models/index'); // mount all models
const routes = require('../server/routes');
const config = require('./env');
const APIError = require('../server/helpers/APIError');
const expressJwt = require('express-jwt');

const app = express();

app.enable('trust proxy');

// app.use((req, res, next) => {
// 	console.log(req.body);
// 	console.log(req.url);
// 	return next();
// });

if (config.env === 'development') {
	app.use(logger('dev'));
} else if (config.env === 'production') {
	app.use(logger('combined'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// app.use(compress({ level: 9 }));
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development' || config.env === 'test') {
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
	app.use(expressWinston.logger({
		winstonInstance,
		statusLevels: true,
		level: 'warn',
		meta: true, 	// optional: log meta data about request (defaults to true)
		msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
		colorStatus: true 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
	}));
	app.use(express.static('public'));
}

app.use(expressJwt({
	secret: config.secret,
	credentialsRequired: true,
	requestProperty: 'me',
	getToken: (req) => {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1];
		} else if (req.query && req.query.token) {
			return req.query.token;
		}
		return null;
	}
}).unless({ path: ['/',
{ url: '/favicon.ico', methods: ['GET'] },
{ url: /v\d+\.\d+\.\d+\/users$/, methods: ['POST'] },
{ url: /.*\/users\/login$/, methods: ['POST'] },
{ url: /.*\/users\/token$/, methods: ['POST'] },
{ url: /.*\/users\/logged-in$/, methods: ['POST'] },
{ url: /.*\/users\/checker\/email$/, methods: ['GET'] },
{ url: /.*\/users\/reset-password\/.{40}/, methods: ['POST'] },
{ url: /.*\/users\/confirmation\/.{40}/, methods: ['POST'] },
{ url: /.*\/users\/forget-password$/, methods: ['POST'] },
{ url: /.*\/EMSCloud\/DataUpload$/, methods: ['POST', 'GET'] },
{ url: /.*\/.well-known\/acme-challenge/, methods: ['POST', 'GET'] },
'/404', '/health-check'] }), (req, res, next) => {
	if (req.me) {
		req.me = JSON.parse(decodeURI(req.me));
	}
	// req.me = { email: 'fishgay1222@gmail.com' };
	next();
});

// mount all routes on /api path
app.use('/', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
	if (err instanceof expressValidation.ValidationError) {
		// validation error contains errors which is an array of error each containing message[]
		const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
		const error = new APIError(unifiedErrorMessage, err.status, true);
		return next(error);
	} else if (!(err instanceof APIError)) {
		const apiError = new APIError(err.message, err.status, err.isPublic);
		apiError.stack = err.stack;
		return next(apiError);
	}
	return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new APIError('API not found', httpStatus.NOT_FOUND);
	return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
	app.use(expressWinston.errorLogger({
		winstonInstance
	}));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>		// eslint-disable-line no-unused-vars
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		stack: config.env === 'development' || config.env === 'test' ? err.stack : {}
	})
);

module.exports = app;
