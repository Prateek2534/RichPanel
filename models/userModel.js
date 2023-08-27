const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
  },
  planStatus: {
    type: String,
    enum: ['inactive','active', 'cancelled'],
    default: 'inactive',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
