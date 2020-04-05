const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt   = require('bcrypt-nodejs');
const Questionnaire   = require('./questionnaire').Questionnaire;

const UserSchema = new mongoose.Schema({
    // email: {type: String, lowercase: true, match: [/\S+@\S+\.\S+/, 'is invalid']},
    // password: {type: String},
    oneTimeQuestionnaire: Questionnaire.schema,
    dailyQuestionnaire: [Questionnaire.schema],
}, {timestamps: true});

UserSchema.methods.generateHash = function(passwordOrEmail) {
    return bcrypt.hashSync(passwordOrEmail, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validateHash = function(passwordOrEmail) {
    return bcrypt.compareSync(passwordOrEmail, this.password);
};

// UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

// UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model("User", UserSchema);