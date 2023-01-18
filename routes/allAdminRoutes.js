const express = require('express');
const router = express.Router();

//// REQUIRE ADMIN AUTH TO PERFORM
const AdminLogin = require('../controllers/adminControllers/adminLoginController');
router.post('/adminLogin', AdminLogin);

module.exports = router;