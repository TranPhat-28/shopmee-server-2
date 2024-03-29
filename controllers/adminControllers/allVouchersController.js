const voucher = require('../../models/voucher');

const fetchVouchersByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 5;
    const page = req.body.pagenumber;
    try {
        const result = await voucher.find().select('voucherCode').skip(page * resultPerPage).limit(resultPerPage);
        if (result.length === 0){
            res.json(
                [{voucherCode: 'No more result to display'}]
            );
        }else{
            res.json(result);
        }  
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
    // Check for missing information
    if (newVoucher.voucherCode === '' || newVoucher.discountPercent === '' || newVoucher.summary === '' || newVoucher.description === '') {
        res.status(400).json('Missing required field(s)');
    }
    else if ((newVoucher.noexp === false) && (newVoucher.expirationDate === '')) {
        res.status(400).json('Expiration date must be set')
    }
    else if(newVoucher.discountPercent > 100 || newVoucher.discountPercent < 1){
        res.status(400).json('Discount must be between 1 and 100')
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
    addNewVoucher,
    deleteVoucher,
}