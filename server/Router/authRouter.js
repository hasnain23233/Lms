const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/authController')

router.get('/', AuthController.firstRequest)

module.exports = router;