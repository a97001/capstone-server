const express = require('express');
const v0_1_0 = require('./v0.1.0');

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
	console.log(req.ips);
	console.log(req.ip);
	console.log(req.headers['x-forwarded-for']);
	console.log(req.connection.remoteAddress);
	res.send('OK');
});

router.get('/.well-known/acme-challenge/*', (req, res) =>
	res.status(200).end()
);

// mount v0.1.0 routes at /v0.1.0
router.use('/v0.1.0', v0_1_0);

module.exports = router;
