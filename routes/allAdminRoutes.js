const express = require('express');
const router = express.Router();
const requireAdminAuth = require('../middleware/requireAdminAuth');
//// REQUIRE ADMIN AUTH TO PERFORM
const AdminLogin = require('../controllers/adminControllers/adminLoginController');
router.post('/adminLogin', AdminLogin);
// Get all products
const { fetchProductsById, fetchProductsByPage, updateProduct, addNewProduct } = require('../controllers/adminControllers/allProductsController');
router.post('/allproducts', requireAdminAuth, fetchProductsByPage);
// Get detail for one product
router.get('/allproducts/:id', requireAdminAuth, fetchProductsById);
// For updating product's information
router.post('/products/:id', requireAdminAuth, updateProduct);
// For adding a new product
router.post('/addProduct', requireAdminAuth, addNewProduct);

module.exports = router;