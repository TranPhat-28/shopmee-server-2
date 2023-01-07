const voucher = require('../../models/voucher');

const fetchVoucher =  async (req, res) => {

    try{
        const nonExpires = await voucher.find({expirationDate: null}).select('voucherCode summary description');
        const expires = await voucher.find({ expirationDate: { $ne: null } }).select('voucherCode summary description');

        res.json({
            nonExpires: nonExpires,
            expires: expires
        })
    }
    catch(err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
}

module.exports = fetchVoucher;