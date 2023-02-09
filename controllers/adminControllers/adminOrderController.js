const order = require('../../models/order');


///// PENDING ORDERS
const fetchPendingOrdersByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 5;
    const page = req.body.pagenumber;
    try {
        const result = await order.find({ status: 'pending' }).select('_id').skip(page * resultPerPage).limit(resultPerPage);
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

const confirmShippingOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await order.findOneAndUpdate({ _id: id }, { status: "confirmed" });
        res.json("The order has been confirmed!");
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

///// CONFIRMED ORDERS
const fetchConfirmedOrdersByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 5;
    const page = req.body.pagenumber;
    try {
        const result = await order.find({ status: 'confirmed' }).select('_id').skip(page * resultPerPage).limit(resultPerPage);
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

module.exports = {
    fetchPendingOrdersByPage,
    fetchConfirmedOrdersByPage,
    fetchOrderById,
    confirmShippingOrder
}