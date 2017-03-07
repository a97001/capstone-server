const express = require('express');
const floorRoutes = require('./floor');
const featureRoutes = require('./feature');
const tileRoutes = require('./tile');
const testRoutes = require('./test');
const uploadRoutes = require('./upload');
const utilRoutes = require('./util');

const router = express();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
	res.send('OK')
);

// mount user routes at /users
uploadRoutes(router);
floorRoutes(router);
featureRoutes(router);
router.use('/storage', tileRoutes);
utilRoutes(router);
testRoutes(router);
module.exports = router;
