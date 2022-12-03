const Product = require('../../models/product');

const newArrivalsFetch = (req, res) => {
    // NEW ARRIVALS
    Product.find({}).sort([['dateAdded', -1]]).limit(5).then((data) => {
        res.json(data);
    })
    .catch(e => {
        res.status(500).json(e.message)
    });
};

const bestSellersFetch = (req, res) => {
    // BEST SELLERS
    Product.find({}).sort([['sold', -1]]).limit(5).then((data) => {
        res.json(data);
    })
    .catch(e => {
        res.status(500).json(e.message)
    });
};

module.exports = {
    newArrivalsFetch,
    bestSellersFetch
}