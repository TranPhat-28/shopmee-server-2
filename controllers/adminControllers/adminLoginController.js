const user = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminLogin = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password){
        res.status(400).json('Missing required field(s)');
    }
    else if (!email.includes('@')){
        res.status(400).json('Wrong email format');
    }
    else{
        // Good input, check if user exist
        user.findOne({ email: email, isAdmin: true }).then(user => {
            if (user === null){
                res.status(400).json('Wrong administrator email');
            }
            else{
                // Perform checking password
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.status(400).json(err.message)
                    } 
                    else if (result === true){
                        // OK, create JWT
                        const token = jwt.sign({
                            _id: user._id,
                            email: user.email,
                            role: 'admin'
                        }, process.env.JWT_SECRET, {expiresIn: '1d'});
                        // Send back to the user
                        res.status(200).json({email, token});
                    }
                    else{
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

module.exports = AdminLogin;