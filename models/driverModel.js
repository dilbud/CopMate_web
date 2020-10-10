const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const driverSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  nic: { type: String },

  active: { type: Boolean, default: false },
  pending: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false },
});

driverSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', driverSchema);
