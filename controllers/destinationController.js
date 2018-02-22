const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const Destination = require('../models/destination')
const Profile = require('../models/profile')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the destination by route params defined in app.js
  Profile.findById(req.params.profileId).then((profile) => {

    // Pass all profile and the destinations to a view specifically for showing all profiles
    const destination = profile.destinations
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
    profileId: req.params.profileId
  })
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Get company we need to save soda to
 Profile.findById(req.params.profileId).then((profile) => {

    // THEN once we have the destination, take req.body and make a new profile
    const newDestination= new Destination({
      name: req.body.name,
      location: req.body.price,
      //packaging: req.body.packaging,
      //quantitySold: req.body.quantitySold
    })

    // Push destination to company.sodas
    profile.destinations.push(newdestination)

    // Save Company
    return profile.save()
  }).then((updatedProfile) => {

    // Redirect to all sodas
    res.redirect(`/profiles/${req.params.profileId}/destinations`)
  }).catch((err) => {
    console.log(err)
  })
})


// SHOW
router.get('/:id', (req, res) => {

  // Find destination from destinationId route param
  Profile.findById(req.params.profileId).then((profile) => {

    // Use the .id method to extract a single profile from destinations.profile
    //const profile = profiles.destination.id(req.params.id)

    // connect it to a soda/show view
    res.render('destination/show', {
      profileId: req.params.profileId,
      destination: destination
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Make sure to take a look at the soda/edit file. It will show you a lot concerning how 
  // to connect the initial values to this edit page
  Profile.findById(req.params.profileId).then((profile) => {
    const destination = profile.destination.id(req.params.id)
    res.render('profile/edit', {
      destinationId: req.params.destinationId,
      destination: destination
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {
  Profile.findById(req.params.profileId).then((profile) => {

    // We don't have a nice method like findByIdAndUpdate here
    // so instead we need to manually change the profile values
    const destination = profile.destination.id(req.params.id)
    destination.name = req.body.name
    destination.price = req.body.price
    destination.packaging = req.body.packaging
    destination.quantitySold = req.body.quantitySold

    // Then Save the company
    return profile.save()
  }).then((updatedProfile) => {
    res.redirect(`/profiles/${updatedProfile._id}/destination/${req.params.id}`)
  }).catch((err) => {
    console.log(err)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {
  Profile.findById(req.params.profileId).then((destinationprofile) => {
    const destination = profile.destinations.id(req.params.id)
    destination.remove()
    return profile.save()
  }).then(() => {
    .catch((err)) =>("Profile saved succesfully")
    res.redirect(`/profiles/${req.params.profileId}/destinations`)
  }).catch((err) => {
    console.log(err)
  })



module.exports = router
