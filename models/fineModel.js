const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const fineSchema = new mongoose.Schema({
  driverNIC: { type: String },
  driverLicenseId: { type: String },
  timeStart: { type: Date, default: () => new Date() },
  timeEnd: {
    type: Date,
    default: () => new Date(+new Date() + 14 * 24 * 60 * 60 * 1000),
  },
  driverName: { type: String },
  policeId: { type: String },
  policeStation: { type: String },
  fine: { type: Array },
  isPaid: { type: Boolean, default: false },
});

fineSchema.plugin(uniqueValidator);

module.exports = mongoose.model('fine', fineSchema);
