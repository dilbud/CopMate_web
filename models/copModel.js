const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const copSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String, default: '' },
  nic: { type: String },
  id: { type: String },
  policeStation: { type: String },
  active: { type: Boolean, default: false },
  pending: { type: Boolean, default: true }, // qr verify
  emailVerified: { type: Boolean, default: false },
});

copSchema.plugin(uniqueValidator);

module.exports = mongoose.model('cop', copSchema);
