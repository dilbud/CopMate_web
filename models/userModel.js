const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: { type: String, unique: false },
  lastName: { type: String, unique: false },
  email: { type: String, unique: true },
  password: { type: String, unique: false },
  nic: { type: String, unique: true },
  userType: { type: String, unique: false },
  policeStation: { type: String, unique: false },
  copId: { type: String, unique: true },
  postOffice: { type: String, unique: false },
  active: { type: Boolean, default: false },
  pending: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator);
console.log('usermodel,js');
module.exports = mongoose.model('user', userSchema);
