const product = require('../../models/product');
const feedback = require('../../models/feedback');

const fetchProductsByPage = async (req, res) => {
    const page = req.body.pagenumber;
    try {
        const result = await product.find().select('productName').skip(page * 5).limit(5);
        if (result.length === 0){
            res.json(
                [{productName: 'No more result to display'}]
            );
        }else{
            res.json(result);
        }  
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
    catch (e) {
        res.status(500).json(e.message)
    }
}

const validateInformationforUpdate = (req, res, next) => {
    const updateParam = req.body;
    // Check for missing information
    if (!updateParam._id || !updateParam.productName || !updateParam.description || !updateParam.price || !updateParam.stockQuantity || !updateParam.sold
        || !updateParam.productImage || !updateParam.category) {
        res.status(400).json('Missing required field(s)');
    }
    // Else OK
    else{
        next();
    }
}

const updateProduct = async (req, res) => {
    const updateParam = req.body;
    try {
        const id = updateParam._id;
        delete updateParam['_id'];

        const result = await product.findOneAndUpdate({ _id: id }, updateParam);
        res.json('Successfully updated');
    }
    catch (e) {
        res.status(500).json(e.message);
    }
    //}
}

const validateInformationforAdding = (req, res, next) => {
    const updateParam = req.body;

    // Check for missing information
    if (!updateParam.productName || !updateParam.description || !updateParam.price || !updateParam.stockQuantity || !updateParam.productImage || !updateParam.category) {
        res.status(400).json('Missing required field(s)');
    }
    // Check for valid data type
    // Else OK
    else{
        next();
    }
}

const addNewProduct = async (req, res) => {
    const newProduct = new product(req.body);
    try{
        // Create a new product
        const result = await newProduct.save();
        // Then create a new feedback for the new product
        const newFeedback = new feedback({
            productID: result._id,
            feedbackList: []
        })
        await newFeedback.save();
        
        res.json('New product added successfully');
    }
    catch(e) {
        res.status(500).json(e.message);
    }
}

module.exports = {
    fetchProductsByPage,
    fetchProductsById,
    updateProduct,
    addNewProduct,
    validateInformationforUpdate,
    validateInformationforAdding
}