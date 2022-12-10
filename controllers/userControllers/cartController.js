const cart = require("../../models/cart");
const product = require("../../models/product");


// View cart
const getCart = async (req, res) => {
    try{
        // List of items from cart
        let cartList = await cart.findOne({ email: req.body.email });
        const total = cartList.total;
        cartList = cartList.itemList;
        

        // A detailed list to display to user
        let detailedList = [];
        
        await Promise.all(cartList.map(async (item) => {
            const contents = await product.findOne({ _id: item.itemId });
            // Push the information to the detailed list
            detailedList.push({
                _id: contents._id,
                name: contents.productName,
                price: contents.price,
                image: contents.productImage,
                quantity: item.quantity,
                total: item.total
            });
        }));

        res.json({detailedList, total});
    }
    catch(e) {
        res.json(e.message);
    }
}



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

module.exports = {
    getCart,
    addtoCart
}