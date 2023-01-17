const voucher = require('../../models/voucher');

const validateVoucher = async (req, res) => {
    const voucherinput = req.body.voucher;

    // If empty
    if (voucherinput === '') {
        res.json('No voucher entered');
    }
    // Validate voucher
    else {
        let message = '';
        const result = await voucher.findOne({ voucherCode: voucherinput }).select('discountPercent expirationDate');

        if (!result) {
            message = 'Voucher not found';
        }
        else {
            // Check if voucher expired
            if (result.expirationDate !== null) {
                // Voucher expire date
                const expireDate = new Date(result.expirationDate.getFullYear(), result.expirationDate.getMonth(), result.expirationDate.getDate());

                // Get today
                const today = new Date();

                if (today > expireDate) {
                    // Expired voucher
                    message = 'Voucher expired';
                }
            }
            else{
                message = result.discountPercent;
            }
        }

        res.json(message);
    }
}

module.exports = validateVoucher;