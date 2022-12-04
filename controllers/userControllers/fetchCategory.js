const Product = require("../../models/product");

const fetchCategory = (req, res) => {
    //res.json("Get all products from category " + req.params.category)
    // No need to catch error for invalid category
    // Because if so the query result will be null

    const category = req.params.category;

    Product.find({ category: category }).then((data) => {
        res.json(data)
    })
    .catch(e => {
        console.log(e);
        res.status(500).json(e.message);
    })
}

module.exports = fetchCategory;