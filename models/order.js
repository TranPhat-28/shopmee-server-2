const mongoose = require('mongoose');

// Schema for each product in the order
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
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
    voucherUsed: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    },
    finalCost: {
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