const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: { type: String },
  password: { type: String },
  NIC: {type: String },
  
  active: { type: Boolean, default: false},
  pending: { type: Boolean, default: true },
  emailVerified: {type: Boolean, default: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
