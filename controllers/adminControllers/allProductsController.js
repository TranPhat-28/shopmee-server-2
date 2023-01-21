const product = require('../../models/product');

const fetchAllProducts = async (req, res) => {
    //const result = await product.find().select('productName');
    //res.json(result);
};

const fetchProductsByPage = async (req, res) => {
    const page = req.body.pagenumber;
    try {
        const result = await product.find().select('productName').skip(page * 5).limit(5);
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

const fetchProductsById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await product.findOne({ _id: id });
        res.json(result);
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

const updateProduct = async (req, res) => {
    const updateParam = req.body;
    
    try{
        const result = await product.findOneAndUpdate({ _id: updateParam._id}, updateParam);
        res.json('Successfully updated');
    }
    catch(e){
        res.status(500).json(e.message);
    }
    

}

module.exports = {
    fetchAllProducts,
    fetchProductsByPage,
    fetchProductsById,
    updateProduct
}