const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const Destination = require('../models/destination')
const Profile = require('../models/profile')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the destinationby route params defined in app.js
  Destination.findById(req.params.destinationId).then((destination) => {

    // Pass all profiles and the destinations to a view specifically for showing all destinations
    const profiles = destination.profile
    console.log(profiles)
    res.render('profile/index', {
      destination: destination,
      profiles: profiles
    })
  }).catch((err) => {
    console.log(err)
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

  // We only need to pass the destination ID to this new view
  res.render('profile/new', {
    destinationId: req.params.destinationId
  })
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Get destination we need to save profile to
  Destination.findById(req.params.destinationId).then((destination) => {

    // THEN once we have the destination, take req.body and make a new profile
    const newProfile = new Profile({
      destination: destination,
      profiles: profiles
    })

    // Push Profile to destination.Profiles
    destination.profiles.push(newProfile)

    // Save destination
    return destination.save()
  }).then((updatedDestination) => {

    // Redirect to all profiles
    res.redirect(`/destinations/${req.params.destinationId}/profile`)
  })
})


// SHOW
router.get('/:id', (req, res) => {

  // Find destinationfrom destination route param
  Destination.findById(req.params.destinationId).then((destination) => {

    // Use the .id method to extract a single profile from destination.profile
    const profile = destination.profiles.id(req.params.id)

    // connect it to a profile/show view
    res.render('profile/show', {
      destinationId: req.params.destinationId,
      profile: profile
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Make sure to take a look at the profile/edit file. It will show you a lot concerning how 
  // to connect the initial values to this edit page
  Destination.findById(req.params.destinationyId).then((destinationy) => {
    const profile = destinationy.profiles.id(req.params.id)
    res.render('profile/edit', {
      destinationyId: req.params.destinationyId,
      profile: profile
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {
  Destination.findById(req.params.destinationId).then((destination) => {

    // We don't have a nice method like findByIdAndUpdate here
    // so instead we need to manually change the profiles values
    const profile = destination.profiles.id(req.params.id)
    profile.name = req.body.name
    profile.location = req.body.location
    profile.phonenumber = req.body.phonenumber
    profile.photo = req.body.photo

    // Then Save the destination
    return destinationy.save()
  }).then((updatedDestination) => {
    res.redirect(`/destination/${updatedDestination._id}/profiles/${req.params.id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {
  Destination.findById(req.params.destinationId).then((destination) => {
    const profile = destination.profiles.id(req.params.id)
      .remove()
    return destination.save()
  }).then(() => {
    res.redirect(`/destination/${req.params.destinationId}/profiles`)
  })
})


module.exports = router