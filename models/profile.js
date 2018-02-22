const mongoose = require('mongoose')
const profileSchema = require('../db/Schemas/destinationSchema')

const Profile = mongoose.model('profile', profileSchema)

module.exports = Profile