const user = require('../../models/user');

const fetchUsersByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 5;
    const page = req.body.pagenumber;
    try {
        const result = await user.find({email: {$ne : "admin@admin"}}).select('email').skip(page * resultPerPage).limit(resultPerPage);
        if (result.length === 0){
            res.json(
                [{email: 'No more result to display'}]
            );
        }else{
            res.json(result);
        }  
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



const restrictUser = async (req, res) => {
    const toRestict = req.body._id;

    try {
        const result = await user.findOneAndUpdate({ _id: toRestict }, { status: "restricted" });
        res.json("User has been restricted!");
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

const removeRestrictUser = async (req, res) => {
    const toRestict = req.body._id;

    try {
        const result = await user.findOneAndUpdate({ _id: toRestict }, { status: "active" });
        res.json("Restriction has been removed!");
    }
    catch(e){
        res.status(500).json(e.message)
    }
}


/*
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
    fetchUserById,
    restrictUser,
    removeRestrictUser
}