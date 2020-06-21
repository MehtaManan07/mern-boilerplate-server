const express = require('express')
const router = express.Router()

const { read, update } = require('../controllers/user')  // import user contollers
const { requireSign, adminMiddleware } = require('../controllers/auth')

// import validators
router.get('/user/:id', requireSign, read )
router.put('/admin/update', requireSign, adminMiddleware, update )
router.put('/user/update', requireSign, update )


module.exports = router