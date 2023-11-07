const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  role : String,
  isConfirm: Boolean,
});

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;

