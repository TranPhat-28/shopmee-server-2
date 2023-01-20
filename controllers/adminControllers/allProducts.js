const product = require('../../models/product');

const fetchAllProducts = async (req, res) => {
    //const result = await product.find().select('productName');
    //res.json(result);
};

const fetchProductsByPage = async (req, res) => {
    const page = req.body.pagenumber;
    const result = await product.find().select('productName').skip(page * 5).limit(5);
    res.json(result);
}

const fetchProductsByName = (req, res) => {
    
}

module.exports = {
    fetchAllProducts,
    fetchProductsByPage,
    fetchProductsByName
}