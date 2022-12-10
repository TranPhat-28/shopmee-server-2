const cart = require("../../models/cart");
const product = require("../../models/product");

// Add item to cart
const addtoCart = async (req, res) => {
    // Authen OK, check for valid amount
    try {
        const data = await product.findOne({ _id: req.body.id });
        if (data.stockQuantity < req.body.quantity){
            res.json('Order number must not exceed stock number');
        }
        else{
            // OK, add item to cart

            // Total cost
            let cost = data.price * req.body.quantity;

            // New item to add to cart
            const newItem = {
                itemId: data._id,
                quantity: req.body.quantity,
                total: cost
            };

            try{
                const newCart = await cart.findOneAndUpdate({email: req.body.user}, { $push: {itemList: newItem}, $inc: {total: cost}});
                res.json('Item(s) added to your cart');
            }catch(e){
                console.log(e.message);
                res.json('Something went wrong while adding items to your cart');
            }
            
        }
    }catch(e){
        console.log(e.message);
        res.json('Something went wrong');
    }
}

module.exports = addtoCart;