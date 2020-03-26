var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");

var UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model("User", UserSchema);