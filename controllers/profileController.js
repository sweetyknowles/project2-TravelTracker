const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const Destination = require('../models/destination')
const Profile = require('../models/profile')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the company by route params defined in app.js
  Destination.findById(req.params.Id).then((destination) => {

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
      price: req.body.price,
      packaging: req.body.packaging,
      quantitySold: req.body.quantitySold
    })

    // Push Profile to destination.Profiles
    destination.profiles.push(newSoda)

    // Save destination
    return destination.save()
  }).then((updatedCompany) => {

    // Redirect to all sodas
    res.redirect(`/companies/${req.params.companyId}/sodas`)
  })
})


// SHOW
router.get('/:id', (req, res) => {

  // Find company from companyId route param
  Company.findById(req.params.companyId).then((company) => {

    // Use the .id method to extract a single soda from company.sodas
    const soda = company.sodas.id(req.params.id)

    // connect it to a soda/show view
    res.render('soda/show', {
      companyId: req.params.companyId,
      soda: soda
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Make sure to take a look at the soda/edit file. It will show you a lot concerning how 
  // to connect the initial values to this edit page
  Company.findById(req.params.companyId).then((company) => {
    const soda = company.sodas.id(req.params.id)
    res.render('soda/edit', {
      companyId: req.params.companyId,
      soda: soda
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {
  Company.findById(req.params.companyId).then((company) => {

    // We don't have a nice method like findByIdAndUpdate here
    // so instead we need to manually change the sodas values
    const soda = company.sodas.id(req.params.id)
    soda.name = req.body.name
    soda.price = req.body.price
    soda.packaging = req.body.packaging
    soda.quantitySold = req.body.quantitySold

    // Then Save the company
    return company.save()
  }).then((updatedCompany) => {
    res.redirect(`/companies/${updatedCompany._id}/sodas/${req.params.id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {
  Company.findById(req.params.companyId).then((company) => {
    const soda = company.sodas.id(req.params.id)
    soda.remove()
    return company.save()
  }).then(() => {
    res.redirect(`/companies/${req.params.companyId}/sodas`)
  })
})


module.exports = router