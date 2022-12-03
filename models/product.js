const mongoose = require('mongoose');

// Define the data schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;