const cart = require("../../models/cart");
const product = require("../../models/product");
const voucher = require("../../models/voucher");
const order = require("../../models/order");


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
        const result = await product.findOne({ _id: item._id }).select('stockQuantity')
        validateArray.push({
            name: item.name,
            orderQuantity: item.quantity,
            stock: result.stockQuantity
        })
    }));

    // Perform checking
    let issue = false;
    validateArray.forEach(item => {
        if (item.orderQuantity > item.stock) {
            issue = true;
            res.status(500).json(item.name + ' is lower in stock than in your order. Please remove the item and retry');
        }
    })

    if (!issue) {
        next()
    }
}

// If no issue, create the order
const createOrder = async (req, res) => {

    const itemList = req.body.itemList;
    let voucherUsed = req.body.voucherUsed;
    if (voucherUsed === '') {
        voucherUsed = 'None'
    }
    const discount = req.body.discount;
    const total = req.body.total;
    const discountAmount = req.body.discountAmount;
    const final = req.body.final;

    // Create a new array of items for the order
    const newItemList = [];
    // Push all items to the new array
    itemList.forEach(item => {
        newItemList.push({
            productId: item._id,
            name: item.name,
            price: item.price,
            productImage: item.image,
            quantity: item.quantity,
            totalPrice: item.total,
            feedbackStatus: 'waiting'
        })
    })

    // New order
    const newOrder = new order({
        email: req.user,
        itemList: newItemList,
        voucherUsed: voucherUsed,
        totalCost: total,
        discountAmount: discountAmount,
        finalCost: final,
        status: 'pending'
    })

    // ALL PROMISES
    const promisesArray = [];
    // 1 - Create new order
    promisesArray.push(newOrder.save());
    // 2 - Substract product from stock and increase sold count
    itemList.forEach(item => {
        promisesArray.push(product.findOneAndUpdate({_id: item._id}, { $inc: { stockQuantity: -item.quantity, sold: item.quantity} }))
    })
    // 3 - Add user to voucher checklist
    promisesArray.push(voucher.findOneAndUpdate({voucherCode: voucherUsed},  { $push: { users: req.user } }));
    // 4 - Empty the cart
    promisesArray.push(cart.findOneAndUpdate({email: req.user}, {itemList: [], total: 0}));

    try {
        const resultAll = Promise.all(promisesArray);
        res.json('Your order has been created');
    }
    catch(e){
        console.log(e.message)
    }

    /*
    console.log('Create order: ' + req.user);
    console.log('----------');

    itemList.forEach(item => {
        console.log(item)
    })

    console.log('----------');
    console.log('VOUCHER USED: ')
    console.log(voucherUsed);
    console.log(discount);

    console.log('----------');
    console.log('Total: ' + total);
    console.log('Discount amount: ' + discountAmount);
    console.log('Final: ' + final);
    */
}


// Retrieve all orders of user
const fetchOrdersByPage = async (req, res) => {
    const page = req.body.pagenumber;
    const status = req.params.status;

    try {
        const result = await order.find({ email: req.user, status: status }).select('dateCreated status').skip(page * 5).limit(5);
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

const fetchOrderById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await order.findOne({ _id: id });
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}


module.exports = {
    confirmValidVoucherUser,
    validateAllItems,
    createOrder,
    fetchOrdersByPage,
    fetchOrderById
}