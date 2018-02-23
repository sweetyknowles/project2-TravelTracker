const mongoose = require('mongoose')
const Schema = mongoose.Schema


const profileSchema = new Schema({
  name: String,
  location: String,
  image: String,

  

})

module.exports = profileSchema