const co = require('co');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Feature Schema
 */
const FeatureSchema = new Schema({
  name: {
    type: String
  },
  metadata: {
    type: Array
  },
  type: {
    type: String
  },
  equipment: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment'
  },
  sensor: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment'
  },
  meter: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  loc: {
    coordinates: [
    ],
    type: {
      type: String
    }
  },
  status: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  master: {
    type: Schema.Types.ObjectId
  },
  deletion: {
    deletedAt: {
      type: Date
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isTarget: {
      type: Boolean
    }
  },
  archive: {
    archivedAt: {
      type: Date
    },
    archivedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isTarget: {
      type: Boolean
    }
  },
  lock: {
    movingDocument: Date
  }
});

/**
 * @typedef Feature
 */
// module.exports = mongoose.model('Feature', FeatureSchema, 'features');

/**
 * Floor Schema
 */
const FloorSchema = new Schema({
  name: {
    type: String,
    required: 'Floor name is required'
  },
  f: {
    type: Number
  },
  ratio: {
    type: Number
  },
  doc: [{
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }],
  features: {
    type: [FeatureSchema],
    default: []
  },
  maxZoom: {
    type: Number,
  },
  minZoom: {
    type: Number
  },
  base: {
    type: Schema.Types.ObjectId,
    ref: 'Tile'
  },
  layer: [{
    name: {
        type: String
    },
    tiles_id: {
      type: Schema.Types.ObjectId
    }
  }],
  building: {
    type: Schema.Types.ObjectId,
    ref: 'Building'
  },
  block: {
    type: Schema.Types.ObjectId,
    ref: 'Block'
  },
  schematic: {
    type: Schema.Types.ObjectId,
    ref: 'Schematic'
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  area: {
    ft2: {
        type: Number
    },
    m2: {
        type: Number
    }
  },
  lock: {
    movingDocument: Date
  }
});

/**
 * Methods
 */
FloorSchema.methods = {
};

/**
 * Statics
 */
FloorSchema.statics = {
  /**
   * Lock moving feature document
   */
  lockFeatureMovingDocument(featureIds, lockTime) {
    const Floor = this;
    return new Promise((resolve, reject) => {
      co(function* () {
        const result = { nModified: 0 };
        for (let i = 0; i < featureIds.length; i++) {
          const r = yield Floor.update({ features: { $elemMatch: { _id: featureIds[i], 'lock.movingDocument': { $exists: false } } } }, { $set: { 'features.$.lock.movingDocument': lockTime } }).exec();
          result.nModified += r.nModified;
        }
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  /**
   * Unlock moving feature document
   */
  unlockFeatureMovingDocument(featureIds, lockTime) {
    const Floor = this;
    return new Promise((resolve, reject) => {
      co(function* () {
        const result = { nModified: 0 };
        for (let i = 0; i < featureIds.length; i++) {
          const r = yield Floor.update({ features: { $elemMatch: { _id: featureIds[i], 'lock.movingDocument': { $exists: true, $lte: lockTime } } } }, { $unset: { 'features.$.lock.movingDocument': '' } }).exec();
          result.nModified += r.nModified;
        }
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  /**
   * Lock moving floor document
   */
  lockFloorMovingDocument(floorIds, lockTime) {
    const Floor = this;
    return new Promise((resolve, reject) => {
      co(function* () {
        const result = yield Floor.update({ _id: { $in: floorIds }, 'lock.movingDocument': { $exists: false } }, { $set: { 'lock.movingDocument': lockTime } }, { multi: true }).exec();
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  /**
   * Unlock moving floor document
   */
  unlockFloorMovingDocument(floorIds, lockTime) {
    const Floor = this;
    return new Promise((resolve, reject) => {
      co(function* () {
        const result = yield Floor.update({ _id: { $in: floorIds }, 'lock.movingDocument': { $exists: true, $lte: lockTime } }, { $unset: { 'lock.movingDocument': '' } }, { multi: true }).exec();
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }
};

/**
 * @typedef Floor
 */
module.exports = mongoose.model('Floor', FloorSchema, 'floors');
