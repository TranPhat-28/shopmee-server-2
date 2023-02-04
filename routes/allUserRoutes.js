const express = require('express');
const router = express.Router();


/////////////////////////////
// NON-AUTH ROUTE

// REGISTER
const userRegister = require('../controllers/userControllers/registerController');
router.post('/register', userRegister);

// LOGIN
const userLogin = require('../controllers/userControllers/loginController');
router.post('/login', userLogin);

// FETCH INITIAL FOR HOME PAGE
const { newArrivalsFetch, bestSellersFetch } = require('../controllers/userControllers/homeFetch');
// New arrivals
router.get('/newArrivals', newArrivalsFetch);
// Best sellers
router.get('/bestSellers', bestSellersFetch);

// Fetch all products of a category
const fetchCategory = require("../controllers/userControllers/fetchCategory");
router.get('/category/:category', fetchCategory);

// For fetching detail information of a single product
const fetchDetail = require("../controllers/userControllers/fetchDetail");
router.get('/product/:id', fetchDetail);

// For searching
const fetchSearch = require("../controllers/userControllers/fetchSearch");
router.get('/search', fetchSearch);

// Fetching voucher information
const fetchVoucher = require("../controllers/userControllers/fetchVoucher");
router.get('/vouchers', fetchVoucher);

// For voucher validation (when user inputing one)
const validateVoucher = require('../controllers/userControllers/validateVoucher');
router.post('/validateVoucher', validateVoucher);



/////////////////////////////////////
// AUTHENTICATED AND AUTHORIZED ROUTES

const requireAuth = require('../middleware/requireAuth');
// Add an item to cart
const { getCart, addtoCart, removeFromCart } = require("../controllers/userControllers/cartController");
router.post('/addtoCart', requireAuth, addtoCart);
// Get cart
router.post('/cart', requireAuth, getCart);
// Remove item from cart
router.post('/cart/:id', requireAuth, removeFromCart);
// Fetch user contact information
const { fetchContactInformation, updateContactInformation, changePassword } = require('../controllers/userControllers/userInformationController');
const { validate } = require('../models/voucher');
router.get('/user/:email', requireAuth, fetchContactInformation);
// Update user contact information
router.post('/user', requireAuth, updateContactInformation);
// Change user password
router.post('/userPassword', requireAuth, changePassword);
const { confirmOrder, createOrder } = require('../controllers/userControllers/orderController');
// Confirm order for user
router.post('/confirmOrder', requireAuth, confirmOrder);



// Submit report
const submitReport = require('../controllers/userControllers/reportController');
router.post('/report', requireAuth, submitReport);

module.exports = router;