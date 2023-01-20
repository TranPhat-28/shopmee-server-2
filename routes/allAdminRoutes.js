const express = require('express');
const router = express.Router();
const requireAdminAuth = require('../middleware/requireAdminAuth');
//// REQUIRE ADMIN AUTH TO PERFORM
const AdminLogin = require('../controllers/adminControllers/adminLoginController');
router.post('/adminLogin', AdminLogin);
// Get all products
const { fetchAllProducts, fetchProductsByName, fetchProductsByPage } = require('../controllers/adminControllers/allProducts');
router.post('/allproducts', requireAdminAuth, fetchProductsByPage);

module.exports = router;