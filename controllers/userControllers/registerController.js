const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Cart = require('../../models/cart');

const userRegister = (req, res) => {
    const { email, password, confirm, phonenumber, address } = req.body;

    if (!email || !password || !confirm || !phonenumber || !address) {
        res.status(400).json('Missing required field(s)');
    }
    else if (!email.includes('@')){
        res.status(400).json('Wrong email format');
    }
    else if (password !== confirm) {
        res.status(400).json('Password and confirm do not match');
    }
    else {
        // Good input
        // Check for duplicated email
        User.exists({ email: email }).then((user) => {
            if (user) {
                //console.log("This email already existed!");
                res.status(400).json('Email already existed');
            }
            else {
                // Hash the provided password
                bcrypt.hash(password, 10).then(hash => {

                    // Get all the input from user and create a new User
                    const newUser = new User({
                        email: email,
                        password: hash,
                        phonenumber: phonenumber,
                        address: address
                    });
                    // Create corresponding cart
                    const newCart = new Cart({
                        email: email,
                        total: 0
                    })

                    // Save to the database
                    Promise.all([newUser.save(), newCart.save()]).then((values) => {
                        //console.log(values);
                        res.status(200).json('OK');
                    })
                    .catch((e) => {
                        console.log(e.message);
                        res.status(400).json('Something went wrong, please try again later');
                    })


                    /*
                    newUser.save()
                    .then(() => {
                        res.status(200).json('OK');
                    })
                    .catch(e => {
                        res.status(400).json('Something went wrong, please try again later');
                        console.log(e.message);
                    })
                    */
                });
            }
        });
        //res.status(200).json('OK');
    }
}

module.exports = userRegister;