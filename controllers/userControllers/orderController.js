const cart = require("../../models/cart");
const product = require("../../models/product");

const confirmOrder = async (req, res) => {
    console.log('Confirm order');
}

const createOrder = (req, res) => {
    console.log('Create order');
}

module.exports = {
    confirmOrder,
    createOrder
}