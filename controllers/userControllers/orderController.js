const cart = require("../../models/cart");
const product = require("../../models/product");
const voucher = require("../../models/voucher");


// Only perform checking voucher
// Check if user has already used the voucher
const confirmValidVoucherUser = async (req, res, next) => {
    const voucherUsed = req.body.voucherUsed;
    const discount = req.body.discount;

    if (typeof discount === 'number') {
        try {
            const result = await voucher.findOne({ voucherCode: voucherUsed }).select('users');

            if (result.users.includes(req.user)) {
                res.status(400).json('You have already used this voucher')
            } else {
                next()
            }
        }
        catch (e) {
            res.status(500).json(e.message);
        }
    } else {
        next();
    }
}


// After checking voucher, perform checking every items
const validateAllItems = async (req, res, next) => {
    const itemList = req.body.itemList;
    const validateArray = [];

    // Fetching data for each item
    await Promise.all(itemList.map(async (item) => {
        const result = await product.findOne({ _id: item._id}).select('stockQuantity')
        validateArray.push({
            name: item.name,
            orderQuantity: item.quantity,
            stock: result.stockQuantity
        })
    }));

    // Perform checking
    let issue = false;
    validateArray.forEach(item => {
        if (item.orderQuantity > item.stock){
            issue = true;
            res.status(500).json(item.name + ' is lower in stock than in your order. Please remove the item and retry');
        }
    })

    if (!issue){
        next()
    }
}

// If no issue, create the order
const createOrder = (req, res) => {
    const itemList = req.body.itemList;
    const voucherUsed = req.body.voucherUsed;
    const discount = req.body.discount;
    const total = req.body.total;
    const discountAmount = req.body.discountAmount;
    const final = req.body.final;

    console.log('Create order: ' + req.user);
    console.log('----------');

    itemList.forEach(item => {
        console.log(item.name)
    })

    console.log('----------');
    console.log('VOUCHER USED: ')
    console.log(voucherUsed);
    console.log(discount);

    console.log('----------');
    console.log('Total: ' + total);
    console.log('Discount amount: ' + discountAmount);
    console.log('Final: ' + final);
}

module.exports = {
    confirmValidVoucherUser,
    validateAllItems,
    createOrder
}