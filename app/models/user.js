var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String
}, {timestamps: true});

UserSchema.methods.generateHash = function(passwordOrEmail) {
    return bcrypt.hashSync(passwordOrEmail, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validateHash = function(passwordOrEmail) {
    return bcrypt.compareSync(passwordOrEmail, this.password);
};

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model("User", UserSchema);