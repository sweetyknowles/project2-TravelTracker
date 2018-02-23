require('dotenv').config()
const mongoose = require('mongoose')
//getting the models from the schema files
const Profile = require('../models/profile')
const Destination = require('../models/destination')

// separate from the server

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection


//will log connected with MongoDB
db.on('open', () => {
    console.log('Successfully connected to mongoDB')
})
// will log an error if not connected to MongoDB
db.on('error', (err) => {
    console.log(err)
})

const Italy = new Destination ({
    name: "",
    location: '',
    image: ''
})

const Belgium = new Destination ({
    name: "",
    location: '',
    image: ''
})
const Rome = new Destination ({
    name: "",
    location: '',
    image: ''
})
const Texas = new Destination ({
    name: "",
    location: '',
    image: ''
})


const user1 = new Profile({
    name: 'Larry',
    location: 'Los Angeles',
    phonenumber: 4448383845823,
    photo: `"images/larry.jpg" alt="actor"`,
    desinations: [italy]
})

const user2 = new Profile({
    name: 'James',
    location: 'Chicago',
    phonenumber: 884028402,
    desinations: [texas, italy]
})
const user3 = new Profile({
    name: 'Zuriel',
    location: 'United Kingom',
    phonenumber: 4470384738,
    desinations: [rome]
})
const user4 = new Profile({
    name: 'sam',
    location: 'United Kingom',
    phonenumber: 4470384738,
    desinations: [belgium]
})



//remove all old information
//returns a promise. this is asynchronise 

Destination.remove().then(() => {
    //returns another promise here. 

    return Profile.remove()
}).then(() => {
    /// build out new profiles and destinations
    // and save them to the database

    return Profile.insertMany([Belgium, Rome, Texas,Italy])
}).then(() => {
    console.log('Saved succeffully')
    db.close()
}).catch((err) => {
console.log(err)
})


