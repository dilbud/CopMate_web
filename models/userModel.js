const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  nic: { type: String },
  userType: { type: String },
  policeStation: { type: String },
  copId: { type: String },
  postOffice: { type: String },
  active: { type: Boolean, default: false },
  pending: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
