const Product = require("../../models/product");

const fetchDetail = (req, res) => {
    Product.findOne({ _id: req.params.id }).then((item) => {
        res.json(item);
    })
    .catch(e => {
        console.log(e.message);
        res.status(500).json(e.message);
    })
}

module.exports = fetchDetail;