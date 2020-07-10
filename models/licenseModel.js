const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const licenseSchema = new mongoose.Schema({
  name: { type: String },
  nic: { type: String },
  licenseId: { type: String },
  active: { type: Boolean, default: true },
});

licenseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('license', licenseSchema);
