const express = require('express')
const router = express.Router()


// REGISTER
const userRegister = require('../controllers/userControllers/registerController');
router.post('/register', userRegister);

// LOGIN
const userLogin = require('../controllers/userControllers/loginController');
router.post('/login', userLogin);

module.exports = router;