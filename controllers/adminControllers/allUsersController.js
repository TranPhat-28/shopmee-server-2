const user = require('../../models/user');

const fetchUsersByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 5;
    const page = req.body.pagenumber;
    try {
        const result = await user.find({email: {$ne : "admin@admin"}}).select('email').skip(page * resultPerPage).limit(resultPerPage);
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

const fetchUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await user.findOne({ _id: id });
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}


/*
const deleteVoucher = async (req, res) => {
    const toDelete = req.body;
    //console.log('Delete voucher ' + voucher._id);
    try{
        await voucher.findOneAndDelete({ _id: toDelete._id, voucherCode: toDelete.voucherCode});
        res.json('Voucher successfully deleted');
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

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
*/


module.exports = {
    fetchUsersByPage,
    fetchUserById
}