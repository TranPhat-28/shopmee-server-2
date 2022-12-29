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
                idInCart: item._id,
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
                // Reference to the document in Product
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

const removeFromCart = async (req, res) => {

    try{
        const id = req.params.id;
        const user = req.user;

        // Find the cart
        let myCart = await cart.findOne({ email: user });
        // Filter the item to remove
        let itemToRemove = await myCart.itemList.filter(item => item._id == id);
        let cost = itemToRemove[0].total;

        // Remove item
        const newCart = await cart.findOneAndUpdate({ email: user }, { $pull: {itemList: {_id: id}}, $inc: {total: -cost}});

        res.json(newCart);
    }catch(e){
        console.log(e.message);
        res.json('Something went wrong while removing item from your cart');
    }
}

module.exports = {
    getCart,
    addtoCart,
    removeFromCart
}