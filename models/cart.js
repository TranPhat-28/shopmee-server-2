const mongoose = require('mongoose');

// Schema for storing product
const cartItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

// Define the data schema
const cartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    itemList: [ cartItemSchema ],
    total: {
        type: Number,
        required: true
    }
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;