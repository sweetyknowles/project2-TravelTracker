const mongoose = require('mongoose')
const Schema = mongoose.Schema


const profileSchema = new Schema({
  name: String,
  location: String,
  phonenumber: Number,
  photo: String


})

module.exports = profileSchema