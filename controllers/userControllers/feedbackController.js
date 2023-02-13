const feedback = require("../../models/feedback");
const order = require("../../models/order");

const fetchFeedbacksByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 3;
    const page = req.body.pagenumber;
    const id = req.params.id;

    try {
        //console.log(`Fetch ${page} for ${id}`);
        const result = await feedback.findOne({ productID: req.params.id }).select('feedbackList');
        const resultArray = result.feedbackList.slice(page * resultPerPage, page * resultPerPage + resultPerPage);
        res.json(resultArray);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

const submitFeedback = async (req, res) => {

    const rating = req.body.rating;
    const feedbackContent = req.body.feedback;
    const idInOrder = req.body.idInOrder;
    const productId = req.body.productId;
    const orderId = req.body.orderId;
    const email = req.user;
    
    
    if (!rating || !feedback || !idInOrder || !productId || !orderId) {
        res.status(400).json('Missing required field(s)');
    }
    else {
        // New feedback
        const feedbackObj = {
            user: email,
            feedback: feedbackContent,
            star: rating
        }

        try{
            // Update feedback available status for the item in the order
            const promiseA = order.findOneAndUpdate({ _id: orderId, "itemList._id": idInOrder }, { $set: { "itemList.$.feedbackStatus": "closed" } });
            // Add new feedback to the db
            const promiseB = feedback.findOneAndUpdate({ productID: productId }, { $push: { feedbackList: feedbackObj } });
            const result = await Promise.all([promiseA, promiseB]);
            res.json('Thank you for your feedback!')
        }
        catch(e){
            res.status(500).json(e.message);
        }
    }
}

module.exports = {
    fetchFeedbacksByPage,
    submitFeedback
}