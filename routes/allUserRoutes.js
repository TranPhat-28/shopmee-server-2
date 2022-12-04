const express = require('express');
const router = express.Router();
const Product = require("../models/product");

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

/*
router.post('/add', (req, res) => {
    const newProduct = new Product({
        productName: "IPhone",
        description: "Wow you rich kid! Having this phone is the testament of a true playboy",
        price: 20000000,
        stockQuantity: 10,
        sold: 0,
        category: "electronics"
    })

    newProduct.save().then(() => { res.json("OK") });
})
*/


/////////////////////////////////////
// AUTHENTICATED AND AUTHORIZED ROUTES
module.exports = router;