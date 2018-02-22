require('dotenv').config()
const mongoose = require('mongoose')
const Profile = require('../models/profile')
const Destination = require('../models/destination')

// separate from the server

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('open', () => {
    console.log('Successfully connected to mongoDB')
})
db.on('error', (err) => {
    console.log(err)
})

const user1 = new Profile({
    name: 'Cam',
    location: 'Atlanta',
    phone: '884028402',
})

const user2 = new Profile({
    name: 'James',
    location: 'Chicago',
    phone: '884028402',
})
const user3 = new Profile({
    name: 'Zuriel',
    location: 'United Kingom',
    phone: '4470384738',
})

//remove all old information
//returns a promise. this is asynchronise 

Profile.remove().then(() => {
    //returns another promise here. 

    return Destination.remove()
}).then(() => {
    /// build out new sodas and companies
    // and save them to the database

    return Destination.insertMany([user3, user2])
}).then(() => {
    console.log('Saved succeffully')
    db.close()
}).catch((err) => {
console.log(err)
})


