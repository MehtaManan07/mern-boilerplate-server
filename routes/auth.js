const express = require('express')
const { signup } = require('../controllers/auth')
const router = express.Router()

router.get('/', signup )

module.exports = router