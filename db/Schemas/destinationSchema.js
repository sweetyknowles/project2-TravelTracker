const mongoose = require('mongoose')
const profileSchema = require('./profileSchema')
const Schema = mongoose.Schema

const destinationSchema = new Schema({
  name: String,
  location: String,
  profiles: [ profileSchema ]
})

module.exports = destinationSchema