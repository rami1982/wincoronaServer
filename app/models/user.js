// Example model

const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

const UsersSchema = new Schema({
 
  Name: String,
  Email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  Symptoms:String,
  Avatar: String,
  Text: String,
  Password:String,
  hash: String,
  salt: String
}, {timestamps: true});




UsersSchema.plugin(uniqueValidator, { message: "is already taken." });

UsersSchema.virtual('date')
  .get(() => this._id.getTimestamp());

UsersSchema.plugin(passportLocalMongoose);



mongoose.model('Users', UsersSchema);


