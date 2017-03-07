const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Tile Schema
 */
const TileSchema = new Schema({
  tile: [{
    z: {
      type: Number
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    img: {
      data: {
        type: String
      },
      contentType: {
        type: String
      }
    }
  }],
  building: {
      type: Schema.Types.ObjectId,
      ref: 'Buildings'
  },
  floor: {
      type: Schema.Types.ObjectId,
      ref: 'Floors'
  },
  groups: [{
      type: Schema.Types.ObjectId,
      ref: 'Group'
  }]
});

/**
 * @typedef Tile
 */
module.exports = mongoose.model('Tile', TileSchema, 'tiles');
