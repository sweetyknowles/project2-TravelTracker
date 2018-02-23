const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const Destination = require('../models/destination')
const Profile = require('../models/profile')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the destinationby route params defined in app.js
  Destination.findById(req.params.Id).then((destinations) => {

    // Pass all sodas and the company to a view specifically for showing all sodas
    const profiles = destination.profiles
    res.render('profile/index', {
      destination: destination,
      profiles: profiles
    })
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

  // Get destination we need to save soda to
  Destination.findById(req.params.destinationId).then((destination) => {

    // THEN once we have the destination, take req.body and make a new Soda
    const newProfile = new Profile({
      name: req.body.name,
      location: req.body.location,
      phonenumber:req.body.phonenumber,
      
    })

    // Push Profile to destination.Profiles
    destination.profiles.push(newProfile)

    // Save destination
    return destination.save()
  }).then((updatedDestination) => {

    // Redirect to all sodas
    res.redirect(`/destinations/${req.params.destinationId}/profiles`)
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
    const soda = destinationy.sodas.id(req.params.id)
    res.render('soda/edit', {
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
    profile.price = req.body.price
    profile.packaging = req.body.packaging
    profile.quantitySold = req.body.quantitySold

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
    const soda = destination.profiles.id(req.params.id)
    soda.remove()
    return destination.save()
  }).then(() => {
    res.redirect(`/destination/${req.params.destinationId}/profiles`)
  })
})


module.exports = router