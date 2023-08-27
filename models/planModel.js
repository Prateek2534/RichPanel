const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    unique: true,
    default: 'free'
  },
  mPrice: {
    type: Number,
    required: true,
  },
  yPrice: {
    type: Number,
    required: true,
  },
  vQuality: {
    type: String,
    enum: ['Good', 'Better', 'Best'],
    required: true,
  },
  res: {
    type: String,
    enum: ['480p', '1080p', '4K+HDR'],
    required: true,
  },
  numDevices: {
    type: Number,
    required: true,
  },
  typesOfDevices: [{
    type: String,
  }],
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
