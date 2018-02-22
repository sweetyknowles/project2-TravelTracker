const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const Destination = require('../models/destination')
const Profile = require('../models/destination')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the destination by route params defined in app.js
  Destination.findById(req.params.destinationId).then((destination) => {

    // Pass all profile and the destinations to a view specifically for showing all profiles
    const profile = destination.profile
    res.render('profile/index', {
      destination: destination,
      profile: profile
    })
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

  // We only need to pass the profile ID to this new view
  res.render('profile/new', {
    destinationId: req.params.destinationId
  })
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Get company we need to save soda to
 Destination.findById(req.params.destinationId).then((destination) => {

    // THEN once we have the destination, take req.body and make a new profile
    const newProfile = new Profile({
      name: req.body.name,
      location: req.body.price,
      packaging: req.body.packaging,
      quantitySold: req.body.quantitySold
    })

    // Push Soda to company.sodas
    destination.profile.push(newSoda)

    // Save Company
    return deestination.save()
  }).then((updatedDestination) => {

    // Redirect to all sodas
    res.redirect(`/destinations/${req.params.destinationId}/profiles`)
  }).catch((err) => {
    console.log(err)
  })
})


// SHOW
router.get('/:id', (req, res) => {

  // Find destination from destinationId route param
  Destination.findById(req.params.destinationId).then((destination) => {

    // Use the .id method to extract a single profile from destinations.profile
    const profile = destination.profiles.id(req.params.id)

    // connect it to a soda/show view
    res.render('profile/show', {
      destinationId: req.params.destinationId,
      profile: profile
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Make sure to take a look at the soda/edit file. It will show you a lot concerning how 
  // to connect the initial values to this edit page
  Destination.findById(req.params.destinationId).then((destination) => {
    const profile = tracker.profiles.id(req.params.id)
    res.render('profile/edit', {
      destinationId: req.params.destinationId,
      profile: profile
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {
  Destination.findById(req.params.destinationId).then((destination) => {

    // We don't have a nice method like findByIdAndUpdate here
    // so instead we need to manually change the profile values
    const profile = destination.profile.id(req.params.id)
    profile.name = req.body.name
    profile.price = req.body.price
    profile.packaging = req.body.packaging
    profile.quantitySold = req.body.quantitySold

    // Then Save the company
    return destination.save()
  }).then((updatedDestination) => {
    res.redirect(`/destinations/${updatedDestination._id}/profile/${req.params.id}`)
  }).catch((err) => {
    console.log(err)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {
  Destination.findById(req.params.destinationId).then((destination) => {
    const profile = destination.profiles.id(req.params.id)
    profile.remove()
    return destination.save()
  }).then(() => {
    res.redirect(`/destinations/${req.params.destinationId}/profile`)
  }).catch((err) => {
    console.log(err)
  })
})


module.exports = router
