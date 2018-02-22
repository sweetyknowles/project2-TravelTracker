const mongoose = require('mongoose')
const destinationSchema = require('../db/Schemas/destinationSchema')

const Destination = mongoose.model('destination',destinationSchema)

module.exports = Destination