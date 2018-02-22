const express = require('express')
const router = express.Router()
const Profile= require('../models/profile')

// INDEX
// GET
router.get('/', (req, res) => {

  // Get All Companies
  Profile.find().then((profiles) => {
    console.log(profiles)

    // Send all the companies to the hbs file called index in the views/company directory
    res.render('profile/index', {
      profiles: profiles
    })
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

  // Just render a view, we don't need to inject any data from our server here
  res.render('profile/new')
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Create a new company and make sure we are ONLY looking at the 
  // pieces of req.body that we need in order to save to the DB
  // Data from req.body is coming from the HTML form
  const newProfile = new Profile({
    name: req.body.name,
    location: req.body.location
  })

  // Save the new company
  newProfile.save().then((savedProfile) => {

    // THEN redirect to the new companies page
    // Remember POST/PUT/PATCH/DELETE routes should not render or send anything
    res.redirect(`/profiles/${savedProfile._id}`)
  })
})


// SHOW
// GET
router.get('/:id', (req, res) => {

  // Find a single company
  Profile.findById(req.params.id).then((profile) => {

    // THEN render that into a handlebars view and pass the company from our db into hbs
    res.render('profile/show', {
     profile: profile
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Find a single company using the route params above
 Profile.findById(req.params.id).then((profile) => {

    // THEN render that and id into a handlebars view and pass the company from our db into hbs
    res.render('profile/edit', {
      id: req.params.id,
      profile: profile
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {

  // Use the route params and form data to update the Company
  Profile.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    location: req.body.location

    // Make sure you add thie { new: true } flag, else your data may not refresh right away
  }, { new: true }).then((updatedProfile) => {

    // Redirect to the show page once it successfully updates
    res.redirect(`/destinations/${updatedProfile._id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {

  // Use the params id to find and remove the Company
  Profile.findByIdAndRemove(req.params.id).then(() => {
    res.redirect(`/profiles`)
  })
})


module.exports = router
