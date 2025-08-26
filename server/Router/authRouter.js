const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/authController')

router.post('/register', AuthController.portAuthRequest)
router.post('/login', AuthController.portLoginRequest)

module.exports = router;