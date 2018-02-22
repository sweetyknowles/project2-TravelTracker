const mongoose = require('mongoose')
const profileSchema = require ('./profileSchema')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  location: String,
  image: String,

  destination: [destinationSchema]

})

module.exports = profileSchema