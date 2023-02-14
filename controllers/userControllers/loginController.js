const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json('Missing required field(s)');
    }
    else if (!email.includes('@')) {
        res.status(400).json('Wrong email format');
    }
    else {
        // Good input, check if user exist
        User.findOne({ email: email }).then(user => {
            if (user === null) {
                res.status(400).json('Email does not exist');
            }
            else {
                // Perform checking password
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.status(400).json(err.message)
                    }
                    else if (result === true) {
                        // If user is restricted
                        if (user.status === 'restricted') {
                            res.status(400).json('Your account has been restricted. Please contact the admin for more information');
                        }
                        else {
                            // OK, create JWT
                            const token = jwt.sign({
                                _id: user._id,
                                email: user.email
                            }, process.env.JWT_SECRET, { expiresIn: '1d' });
                            // Send back to the user
                            res.status(200).json({ email, token });
                        }
                    }
                    else {
                        res.status(400).json('Wrong password');
                    }
                });
            }
        })
            .catch(e => {
                res.status(400).json('Something went wrong');
                console.log(e);
            })
    }
}

module.exports = userLogin;