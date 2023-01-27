const voucher = require('../../models/voucher');

const fetchVouchersByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 5;
    const page = req.body.pagenumber;
    try {
        const result = await voucher.find().select('voucherCode').skip(page * resultPerPage).limit(resultPerPage);
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

const fetchVoucherById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await voucher.findOne({ _id: id });
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

/*
const updateProduct = async (req, res) => {
    const updateParam = req.body;

    // Check for missing information
    //if (!updateParam.productName || !updateParam.description || !updateParam.price || !updateParam.stockQuantity || !updateParam.sold
    //    || !updateParam.productImage || !updateParam.category) {
    //    res.status(400).json('Missing required field(s)');
    //}
    //else {
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
*/

const addNewVoucher = async (req, res) => {
    const newVoucher = req.body;
    if ((newVoucher.noexp === false) && (newVoucher.exp === '')) {
        res.status(400).json('Expiration date must be set')
    }
    else if(newVoucher.discountPercent > 100 || newVoucher.discountPercent < 1){
        res.status(400).json('Discount must be from 1 to 100')
    }
    else {
        try {
            if (newVoucher.noexp === true){
                newVoucher.exp = null
            }
            const newObj = new voucher(newVoucher);
            await newObj.save();
            res.json('New voucher added successfully');
        }
        catch (e) {
            res.status(500).json(e.message);
        }
    }
}

module.exports = {
    fetchVouchersByPage,
    fetchVoucherById,
    addNewVoucher
}