const express = require('express');
const router = express.Router();
const Product = require("../models/product");


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

/*
router.post('/add', (req, res) => {
    const newProduct = new Product({
        productName: "Oppo Reno",
        description: "A very competent product with a reasonable price.",
        price: 9000000,
        stockQuantity: 10,
        sold: 0,
        category: "electronics"
    })

    newProduct.save().then(() => { res.json("OK") });
})
*/



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
const { fetchContactInformation, updateContactInformation } = require('../controllers/userControllers/userInformationController');
router.get('/user/:email', requireAuth, fetchContactInformation);
// Update user contact information
router.post('/user', requireAuth, updateContactInformation);

module.exports = router;