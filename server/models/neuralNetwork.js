const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * NeuralNetwork Schema
 */
const NeuralNetworkSchema = new Schema({
  equipment: {
    type: Schema.Types.ObjectId
  },
  trainDate: {
    type: Date
  },
  trainCompleteDate: {
    type: Date
  },
  hiddenLayer: {
    type: Array
  },
  inputData: {
    type: Array
  },
  outputData: {
    type: Array
  },
  minMaxData: {
    type: Schema.Types.Mixed
  },
  startDate: Date,
  endDate: Date,
  network: {
    type: Schema.Types.Mixed
  },
  trainingProgress: {
    type: Number,
    default: 0
  }
});

/**
 * @typedef NeuralNetwork
 */
module.exports = mongoose.model('NeuralNetwork', NeuralNetworkSchema, 'neuralNetworks');
