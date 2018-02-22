const mongoose = require('mongoose')
const profileSchema = require('../db/Schemas/profileSchema')

const Profile = mongoose.model('profile',profileSchema)

module.exports = Profile