const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  location: Number,
  phonenumber: Number, 
 destinations: String
})

module.exports = profileSchema
