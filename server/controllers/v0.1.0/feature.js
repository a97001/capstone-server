const co = require('co');
const async = require('async');
const mongoose = require('mongoose');

const Floor = mongoose.model('Floor');

const objectId = mongoose.Types.ObjectId;

module.exports = {
	/**
	 * Load feature and append to req.
	 */
	load(req, res, next, id) {
		co(function* () {
      let query = null;
      query = [
				{ $match: {
					'features._id': objectId(id), building: req.building._id
				} },
				{ $project: { _id: 1, floorName: '$name', features: 1, block: 1 } },
				{ $unwind: '$features' },
				{ $match: {
						'features._id': objectId(id), 'features.status': 'approved'
				} },
				{ $project: {
					_id: '$features._id',
					floor: { _id: '$_id', name: '$floorName', block: '$block' },
					name: '$features.name',
					metadata: '$features.metadata',
					type: '$features.type',
					loc: '$features.loc',
					creator: '$features.creator',
					createdAt: '$features.createdAt',
					updatedAt: '$features.updatedAt',
					updatedBy: '$features.updatedBy',
					status: '$features.status',
					equipment: '$features.equipment',
					location: '$features.location',
					sensor: '$features.sensor',
					meter: '$features.meter'
				} }
      ];
      const result = yield Floor.aggregate(query).exec();
      if (!result || !result[0]) {
        return res.status(404).end();
      }
      req.feature = result[0];
      return next();
		}).catch((err) => {
			next(err);
		});
	},

  /**
   * Show a feature
   */
  showFeature(req, res, next) {
    co(function* () {
			const sizeResult = yield {
			};
			req.feature.documentTotal = { folder: sizeResult.folder, document: sizeResult.document };
			if (sizeResult.filesize[0]) {
				req.feature.documentSize = sizeResult.filesize[0].filesize;
			} else {
				req.feature.documentSize = 0;
			}
      return res.json(req.feature);
    }).catch((err) => {
      next(err);
    });
  },

  /**
   * Update feature
   */
  updateFeature(req, res, next) {
    co(function* () {
      const name = req.body.name;
      const type = req.body.type;
      const metadata = req.body.metadata;
      const equipment = req.body.equipment;
			const sensor = req.body.sensor;
			const meter = req.body.meter;
			const location = req.body.location;
			const loc = req.body.loc;
			const floor = req.body.floor;

			if (req.feature.type !== 'unclassified' && req.feature.type !== type) {
				return res.status(400).json({ err: 'Cannot change type except "unclassified"' });
			}

			const changes = { $set: {} };
			changes.$set['features.$.updatedAt'] = new Date();
			changes.$set['features.$.updatedBy'] = req.me._id;
			if (name) {
				changes.$set['features.$.name'] = name;
			}
			if (type && type !== req.feature.type) {
				changes.$set['features.$.type'] = type;
			}
			if (metadata) {
				changes.$set['features.$.metadata'] = metadata;
			}
			if (loc) {
				if (loc.type === 'Polygon' || loc.type === 'Rectangle') {
					loc.coordinates.forEach((outerPair) => {
						outerPair.forEach((coordPair) => {
							const tmp = coordPair[0];
							coordPair[0] = coordPair[1];
							coordPair[1] = tmp;
						});
					});
				} else if (loc.type === 'Point') {
					const tmp = loc.coordinates[0];
					loc.coordinates[0] = loc.coordinates[1];
					loc.coordinates[1] = tmp;
				} else {
					return res.status(400).json({ err: 'Invalid loc' });
				}
				changes.$set['features.$.loc'] = loc;
			}

			yield Floor.update({ 'features._id': req.feature._id }, changes).exec();
			if (floor && floor !== req.feature.floor._id.toString()) {
				const count = yield Floor.count({ _id: floor, building: req.building._id }).exec();
				if (count === 0) {
					return res.status(400).json({ err: 'Invalid floor' });
				}
				const query = [
					{ $match: { 'features._id': objectId(req.feature._id) } },
					{ $project: { features: 1 } },
					{ $unwind: '$features' },
					{ $match: { 'features._id': objectId(req.feature._id) } }
				];
				const result = yield Floor.aggregate(query).exec();
				if (result && result[0]) {
					const updatingFeature = result[0].features;
					updatingFeature.updatedAt = new Date();
					updatingFeature.updatedBy = req.me._id;
					yield Floor.update({ _id: floor, 'features._id': { $ne: req.feature._id } }, { $push: { features: updatingFeature } }).exec();
					yield Floor.update({ _id: req.feature.floor._id, 'features._id': req.feature._id }, { $pull: { features: { _id: updatingFeature._id } } }).exec();
				} else {
					return res.status(400).json({ err: 'No such feature' });
				}
			}
      return res.json({ type });
		}).catch((err) => {
			next(err);
		});
  },

  /**
   * Delete feature
   */
  deleteFeature(req, res, next) {
    co(function* () {
      const feature = req.feature;
			const deletedAt = new Date();
      const result = yield Floor.update({ features: { $elemMatch: { _id: feature._id, status: 'approved' } } }, { $set: { 'features.$.status': 'deleted', 'features.$.deletion': { deletedAt, deletedBy: req.me._id, isTarget: true } } }).exec();
			if (result.nModified === 0) {
				return res.status(404).end();
			}
      return res.status(200).json({ _id: feature._id });
    }).catch((err) => {
      next(err);
    });
  }
};
