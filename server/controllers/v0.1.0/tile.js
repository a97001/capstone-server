const co = require('co');
const mongoose = require('mongoose');
const config = require('../../../config/env');

const Tile = mongoose.model('Tile');

const objectId = mongoose.Types.objectId;

module.exports = {
  showErrorTile(req, res, next) {
    res.sendFile(`${__dirname}/error_tile.jpg`);
  }
};
