const async = require('async');
const co = require('co');
const StreamZip = require('node-stream-zip');
const GeoJSON = require('mongodb-geojson-normalize');
const fs = require('fs');
const del = require('del');
const mongoose = require('mongoose');
const config = require('../../../config/env');
const _ = require('lodash');

const Floor = mongoose.model('Floor');
const Tile = mongoose.model('Tile');

const objectId = mongoose.Types.ObjectId;

module.exports = {
	/**
	 * Load floor and append to req.
	 */
	load(req, res, next, id) {
		co(function* () {
      // const me = yield User.findOne({ _id: req.me._id }).lean().exec();
      // let floor = null;
      // if (me.roles.indexOf('internalAdmin') < 0) {
      //   if (!req.me.scope.group) {
      //     return res.status(403).end();
      //   }
      //   floor = yield Floor.findOne({ _id: id, groups: req.me.scope.group._id }, '-doc').exec();
      // } else {
      //   floor = yield Floor.findOne({ _id: id }, '-doc').exec();
      // }
			const floor = yield Floor.findOne({ _id: id, building: req.building._id }, '-doc').exec();
      if (!floor) {
        return res.status(404).end();
      }
      req.floor = floor;
      return next();
		}).catch((err) => {
			next(err);
		});
	},

  /**
   * Show a floor
   */
  show(req, res, next) {
    co(function* () {
      const floor = req.floor.toObject();
      // delete floor.features;
      return res.json(floor);
    }).catch((err) => {
      next(err);
    });
  },

  /**
   * Update floor tiles
   */
  updateFloorTiles(req, res, next) {
    co(function* () {
      const file = req.body.uploadedDocs[0];
      let tempDir = '/uploaded/files/test/temp-';
      file.path = `/uploaded/files/test/${file.name}`;
      if (process.env.NODE_ENV === 'test') {
        file.path = `${__dirname}/../../tests/testing_files/${file.name}`;
        tempDir = `${__dirname}/../../tests/testing_files/temp-`;
      }
      const zip = new StreamZip({
        file: file.path
      });
      zip.on('ready', () => {
        // extract file
        fs.mkdtemp(tempDir, (err, folder) => {
          const newTile = new Tile({
            floor: req.floor._id,
            building: req.floor.building,
            groups: req.floor.groups,
            tile: []
          });
          const min = 2;
          const max = 5;
          const width = 8191;
          const height = 5791;
          const constant = Math.pow(2, max) * 256;
          // fs.mkdir(`${folder}/${newFloor.name}`, (err) => {
            zip.extract(null, `${folder}`, (err, count) => {
              for (let i = min; i <= max; i++) {
                const x = Math.pow(2, i);
                const xnum = Math.ceil(width / constant * x);
                for (let j = 0; j < xnum; j++) {
                  const y = Math.pow(2, i);
                  const ynum = Math.ceil(height / constant * y);
                  for (let a = 0; a < ynum; a++) {
                    const tileData = fs.readFileSync(`${folder}/${i}/${j}/${a}.jpg`).toString('base64');
                    newTile.tile.push({
                      z: i,
                      x: j,
                      y: a,
                      img: {
                        data: tileData,
                        contentType: 'image/jpg'
                      }
                    });
                  }
                }
              }
              newTile.save((err) => {
                if (err) console.log(err);
                const oldBase = req.floor.base;
                req.floor.base = newTile._id;
                req.floor.save((err) => {
                  Tile.remove({ _id: oldBase }, (err) => {
                    del([`${folder}/**`]).then((paths) => {
                      // console.log('Deleted files and folders:\n', paths.join('\n'));
                      if (process.env.NODE_ENV !== 'test') {
                        fs.unlink(file.path, (err) => {});
                      }
                      if (err) {
                        console.log(err);
                        return res.status(500).end();
                      }
                      return res.json(req.floor);
                    });
                  });
                });
              });
            });
          // });
        });
      });
    }).catch((err) => {
      next(err);
    });
  },

  /**
   * Show floor tile
   */
  showFloorTile(req, res, next) {
    co(function* () {
      const tile = yield Tile.findOne({ _id: req.params.tileId, floor: req.floor._id }, { tile: { $elemMatch: { z: req.params.z, x: req.params.x, y: req.params.y } } }).lean().exec();
      if (!tile || !tile.tile || !tile.tile[0]) {
        return res.status(404).end();
      }
      res.type(tile.tile[0].img.contentType);
      return res.send(Buffer.from(tile.tile[0].img.data, 'base64'));
    }).catch((err) => {
      next(err);
    });
  },

  /**
   * Update floor
   */
  updateFloor(req, res, next) {
    co(function* () {
			const updates = Object.keys(req.body);
			for (let i = 0; i < updates.length; i++) {
				req.floor[updates[i]] = req.body[updates[i]];
			}
			yield req.floor.save();
			return res.json(req.floor);
		}).catch((err) => {
			next(err);
		});
  },

  /**
   * Show feature type features
   */
  showFeatureTypeFeatures(req, res, next) {
    co(function* () {
      const docResult = {};
      const documentCount = {};
      if (!docResult || !docResult[0]) {
        documentCount.hasDoc = [];
        documentCount.hasImg = [];
        documentCount.hasBoth = [];
      } else {
        documentCount.hasDoc = docResult[0].hasDoc;
        documentCount.hasImg = docResult[0].hasImg;
        documentCount.hasBoth = docResult[0].hasBoth;
      }
      async.each(req.floor.features, (feature, callback) => {
        if (feature.type !== req.params.featureType) {
          return callback();
        }
        if (feature.type === 'equipment' || feature.type === 'meter') {
          co(function* () {
            const equipmentDocResult = yield {
            };
            if (equipmentDocResult.imgDocument && equipmentDocResult.docDocument) {
              documentCount.hasBoth.push(objectId(feature._id));
            } else {
              if (equipmentDocResult.imgDocument) {
                documentCount.hasImg.push(objectId(feature._id));
              } else if (equipmentDocResult.docDocument) {
                documentCount.hasDoc.push(objectId(feature._id));
              }
            }
            return callback();
          });
        } else {
          callback();
        }
      }, (err) => {
        async.parallel({
            hasDoc: (callback) => {
              Floor.aggregate([
                { $match: { _id: objectId(req.floor._id) } },
								{ $project: { _id: 1, floorName: '$name', features: 1 } },
                { $unwind: '$features' },
                { $match: { 'features._id': { $in: documentCount.hasDoc }, 'features.type': req.params.featureType, 'features.status': { $in: ['approved'] }, 'features.loc.coordinates': { $ne: [] } } },
                { $project: {
                  _id: '$features._id',
									floor: { _id: '$_id', name: '$floorName' },
                  name: '$features.name',
                  metadata: '$features.metadata',
                  type: '$features.type',
                  master: '$features.master',
                  loc: '$features.loc',
									creator: '$features.creator',
									createdAt: '$features.createdAt',
									updatedAt: '$features.updatedAt',
									updatedBy: '$features.updatedBy',
									equipment: '$features.equipment',
									location: '$features.location',
									sensor: '$features.sensor',
									meter: '$features.meter',
                  status: { $literal: 'hasDoc' }
                } },
                { $group: {
                    _id: null,
                    features: { $push: '$$ROOT' }
                } }
              ], (err, result) => {
                if (err) console.log(err);
                if (!result || !result[0] || !result[0].features) {
                  callback(null, []);
                } else {
                  callback(null, result[0].features);
                }
              });
            },
            hasImg: (callback) => {
              Floor.aggregate([
                { $match: { _id: objectId(req.floor._id) } },
								{ $project: { _id: 1, floorName: '$name', features: 1 } },
                { $unwind: '$features' },
                { $match: { 'features._id': { $in: documentCount.hasImg }, 'features.type': req.params.featureType, 'features.status': { $in: ['approved'] }, 'features.loc.coordinates': { $ne: [] } } },
                { $project: {
                  _id: '$features._id',
									floor: { _id: '$_id', name: '$floorName' },
                  name: '$features.name',
                  metadata: '$features.metadata',
                  type: '$features.type',
                  master: '$features.master',
                  loc: '$features.loc',
									creator: '$features.creator',
									createdAt: '$features.createdAt',
									updatedAt: '$features.updatedAt',
									updatedBy: '$features.updatedBy',
									equipment: '$features.equipment',
									location: '$features.location',
									sensor: '$features.sensor',
									meter: '$features.meter',
                  status: { $literal: 'hasImg' }
                } },
                { $group: {
                    _id: null,
                    features: { $push: '$$ROOT' }
                } }
              ], (err, result) => {
                if (!result || !result[0] || !result[0].features) {
                  callback(null, []);
                } else {
                  callback(null, result[0].features);
                }
              });
            },
            hasBoth: (callback) => {
              Floor.aggregate([
                { $match: { _id: objectId(req.floor._id) } },
								{ $project: { _id: 1, floorName: '$name', features: 1 } },
                { $unwind: '$features' },
                { $match: { 'features._id': { $in: documentCount.hasBoth }, 'features.type': req.params.featureType, 'features.status': { $in: ['approved'] }, 'features.loc.coordinates': { $ne: [] } } },
                { $project: {
                  _id: '$features._id',
									floor: { _id: '$_id', name: '$floorName' },
                  name: '$features.name',
                  metadata: '$features.metadata',
                  type: '$features.type',
                  master: '$features.master',
                  loc: '$features.loc',
									creator: '$features.creator',
									createdAt: '$features.createdAt',
									updatedAt: '$features.updatedAt',
									updatedBy: '$features.updatedBy',
									equipment: '$features.equipment',
									location: '$features.location',
									sensor: '$features.sensor',
									meter: '$features.meter',
                  status: { $literal: 'hasBoth' }
                } },
                { $group: {
                    _id: null,
                    features: { $push: '$$ROOT' }
                } }
              ], (err, result) => {
                if (!result || !result[0] || !result[0].features) {
                  callback(null, []);
                } else {
                  callback(null, result[0].features);
                }
              });
            },
            none: (callback) => {
              Floor.aggregate([
                { $match: { _id: objectId(req.floor._id) } },
								{ $project: { _id: 1, floorName: '$name', features: 1 } },
                { $unwind: '$features' },
                { $match: { $and: [{ 'features._id': { $nin: documentCount.hasBoth } }, { 'features._id': { $nin: documentCount.hasImg } }, { 'features._id': { $nin: documentCount.hasDoc } }], 'features.type': req.params.featureType, 'features.status': { $in: ['approved'] }, 'features.loc.coordinates': { $ne: [] } } },
                { $project: {
                  _id: '$features._id',
									floor: { _id: '$_id', name: '$floorName' },
                  name: '$features.name',
                  metadata: '$features.metadata',
                  type: '$features.type',
                  master: '$features.master',
                  loc: '$features.loc',
									creator: '$features.creator',
									createdAt: '$features.createdAt',
									updatedAt: '$features.updatedAt',
									updatedBy: '$features.updatedBy',
									equipment: '$features.equipment',
									location: '$features.location',
									sensor: '$features.sensor',
									meter: '$features.meter',
                  status: { $literal: 'none' }
                } },
                { $group: {
                    _id: null,
                    features: { $push: '$$ROOT' }
                } }
              ], (err, result) => {
                if (!result || !result[0] || !result[0].features) {
                  callback(null, []);
                } else {
                  callback(null, result[0].features);
                }
              });
            }
          },
          (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).end();
            }
            let tempFeature = [];
						tempFeature = results.hasDoc.concat(results.hasImg);
						tempFeature = tempFeature.concat(results.hasBoth);
						tempFeature = tempFeature.concat(results.none);
						co(function* () {
							tempFeature = GeoJSON.parse(tempFeature, { path: 'loc' });
							// }
							return res.json(tempFeature.features);
						}).catch((err) => {
							next(err);
						});
          });
        });
    }).catch((err) => {
      next(err);
    });
  },

  /**
   * Create floor feature
   */
  createFloorFeature(req, res, next) {
    co(function* () {
      const feature = {
        _id: mongoose.Types.ObjectId(), // eslint-disable-line new-cap
        name: 'unclassified',
        metadata: [],
        type: req.params.featureType,
        loc: req.body,
        status: 'approved',
				creator: req.me._id,
				createdAt: new Date(),
				updatedBy: req.me._id,
				updatedAt: new Date(),
        master: null
      };

      if (feature.loc.type === 'Polygon' || feature.loc.type === 'Rectangle') {
        feature.loc.coordinates.forEach((outerPair) => {
          outerPair.forEach((coordPair) => {
            const tmp = coordPair[0];
            coordPair[0] = coordPair[1];
            coordPair[1] = tmp;
          });
        });
      } else if (feature.loc.type === 'Point') {
        const tmp = feature.loc.coordinates[0];
        feature.loc.coordinates[0] = feature.loc.coordinates[1];
        feature.loc.coordinates[1] = tmp;
      }

      yield Floor.update({ _id: req.floor._id }, { $push: { features: feature } }).exec();
      const output = GeoJSON.parse([feature], { path: 'loc' });
      return res.status(201).json(output.features[0]);
    }).catch((err) => {
      next(err);
    });
  }
};
