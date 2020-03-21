// Example model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
 
  Name: String,
  Email:String,
  Symptoms:String,
  Avatar: String,
  text: String
});

UsersSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Users', UsersSchema);


