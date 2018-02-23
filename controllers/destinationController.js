const express = require('express')
const router = express.Router()
const Destination = require('../models/destination')

// INDEX
// GET
router.get('/', (req, res) => {

  // Get All Destinations
  Destination.find()
  .then((destinations) => {
    console.log(destinations)

    // Send all the destinations to the hbs file called index in the views/destination directory
    res.render('destination/index', {
      destinations: destinations
    })
  }).catch((err) => {
    console.log(err)
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

  // Just render a view, we don't need to inject any data from our server here
  res.render('destination/new')
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Create a new destination and make sure we are ONLY looking at the 
  // pieces of req.body that we need in order to save to the DB
  // Data from req.body is coming from the HTML form
  const newDestination = new Destination({
    name: req.body.name,
    location: req.body.location
  })

  // Save the new company
  newDestination.save().then((savedDestination) => {

    // THEN redirect to the new destinations page
    // Remember POST/PUT/PATCH/DELETE routes should not render or send anything
    res.redirect(`/destinations/${savedDestination._id}`)
  }).catch((err) => {
    console.log(err)
  })
})


// SHOW
// GET
router.get('/:id', (req, res) => {

  // Find a single company
  Destination.findById(req.params.id).then((destination) => {

    // THEN render that into a handlebars view and pass the destination from our db into hbs
    res.render('destination/show', {
      destinationId: req.params.id,
      destination: destination
    })
  }).catch((err) => {
    console.log(err)
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Find a single destination using the route params above
  Destination.findById(req.params.id).then((destination) => {

    // THEN render that and id into a handlebars view and pass the destination from our db into hbs
    res.render('destination/edit', {
      id: req.params.id,
      destination: destination
    })
  }).catch((err) => {
    console.log(err)
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {

  // Use the route params and form data to update the Destination
  Destination.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    location: req.body.location

    // Make sure you add thie { new: true } flag, else your data may not refresh right away
  }, { new: true }).then((updatedDestination) => {

    // Redirect to the show page once it successfully updates
    res.redirect(`/destinations/${updatedDestination._id}`)
  }).catch((err) => {
    console.log(err)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {

  // Use the params id to find and remove the Destination
  Destination.findByIdAndRemove(req.params.id).then(() => {
    res.redirect(`/destinations`)
  }).catch((err) => {
    console.log(err)
  })
})


module.exports = router
