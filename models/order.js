const mongoose = require('mongoose');

// Schema for each product in the order
const orderItemSchema = new mongoose.Schema({
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
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    },
    productImage: {
        type: imageSchema,
        required: true
    },
    feedbackStatus: {
        type: String,
        required: true
    }
});

// The Order schema
const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    itemList: {
        type: [ orderItemSchema ],
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;