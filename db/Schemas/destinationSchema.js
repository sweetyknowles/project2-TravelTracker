const mongoose = require('mongoose')
const profileSchema = require('./profileSchema')
const Schema = mongoose.Schema


const destinationSchema = new Schema({
  name: String,
  photo: String,
  description: String,
  negativeNotes: String,
  facts:String,


  profile: [profileSchema] // This sets up a one to many relationship
})

module.exports = destinationSchema
