// Example model

const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
 
  Name: String,
  Email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  Symptoms:String,
  Avatar: String,
  Text: String,
  Password:String,
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model('User', UserSchema);


