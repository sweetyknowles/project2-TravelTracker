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

const user1 = new Profile({
    name: 'Larry',
    location: 'Los Angeles',
    phonenumber: 4448383845823,
    photo: "/images/larry.jpg"

})

const user2 = new Profile({
    name: 'James',
    location: 'Chicago',
    phonenumber: 884028402,
    photo: "/images/larry.jpg"

})
const user3 = new Profile({
    name: 'Zuriel',
    location: 'United Kingom',
    phonenumber: 4470384738,
    photo: "/images/larry.jpg"
})

const user4 = new Profile({
    name: 'sam',
    location: 'United Kingom',
    phonenumber: 4470384738,
    photo: "/images/larry.jpg"
})


const Italy = new Destination({
    name: "Italy",
    photo: "/images/venice.jpg",
    description: "I love Italian beaches and food!",
    negativeNotes: "Language barrier!you should learn the basics",
    profile: [user4, user2]
})

const Belgium = new Destination({
    name: "Belgium",
    photo: "/images/belgia.jpg",
    description: " Belgium is like a Delicious Chocolate.",
    negativeNotes: "It is gorgeous. Be Vanilla with Chocolate.",
     profile: [user3, user1]

})

const Rome = new Destination({
    name: "Rome",
    photo: "images/rome3.jpg",
    description: " Rome is ROme!.",
    negativeNotes: "dress like a roman when in Rome",
    profile: [user2]
})
const Texas = new Destination({

    name: "Texas",
    photo: "images/texas2.jpg",
    description: " EEEEHAAA!.",
    negativeNotes: "visit in winter or be prepare to get fried with 100 degrees",
    profile: [user1]
})




//remove all old information
//returns a promise. this is asynchronise 

Destination.remove().then(() => {
    //returns another promise here. 

    return Profile.remove()
}).then(() => {
    /// build out new profiles and destinations
    // and save them to the database

    return Destination.insertMany([Belgium, Rome, Texas, Italy])
}).then(() => {
    console.log('Saved succeffully')
    db.close()
}).catch((err) => {
    console.log(err)
})


