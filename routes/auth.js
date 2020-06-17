const express = require('express')
const router = express.Router()

const { signup, accountActivation } = require('../controllers/auth')  // import auth contollers

// import validators
const { userSignupValidator } = require('../validators/auth')  
const { runValidation } = require('../validators')  

router.post('/signup', userSignupValidator, runValidation, signup )
router.post('/account-activation', accountActivation )

module.exports = router