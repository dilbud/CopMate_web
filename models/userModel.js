const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: { type: String, unique: true },
  lastName: { type: String }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
