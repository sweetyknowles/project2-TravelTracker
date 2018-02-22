require('dotenv').config()
const mongoose = require('mongoose')
const Profile = require('../models/destination')
const Destination = require('../models/profile')

// separate from the server

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('open', () => {
    console.log('Successfully connected to mongoDB')
})
db.on('error', (err) => {
    console.log(err)
})

const italy = new Destination ({
    name: "",
    location: '',
    image: ''
})

const belgium = new Destination ({
    name: "",
    location: '',
    image: ''
})
const rome = new Destination ({
    name: "",
    location: '',
    image: ''
})
const texas = new Destination ({
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
    /// build out new sodas and companies
    // and save them to the database

    return Profile.insertMany([user1, user2, user3,user4])
}).then(() => {
    console.log('Saved succeffully')
    db.close()
}).catch((err) => {
console.log(err)
})


