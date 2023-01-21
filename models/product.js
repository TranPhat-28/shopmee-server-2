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
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        default: "https://drive.google.com/uc?id=1AiOH1J6m5B8CawvCrD6XqACZyDj75-Kd"
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;