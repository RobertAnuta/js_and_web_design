const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require("email-validator");


const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

validator.validate("test@test.com");

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);