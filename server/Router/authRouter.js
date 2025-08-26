const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/authController')

router.post('/', AuthController.portAuthRequest)

module.exports = router;