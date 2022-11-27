const User = require('../../models/user');
const bcrypt = require('bcrypt');

const userLogin = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password){
        res.status(400).json('Missing required field(s)');
    }
    else if (!email.includes('@')){
        res.status(400).json('Wrong email format');
    }
    else{
        // Good input, check if user exist
        User.findOne({ email: email }).then(user => {
            if (user === null){
                res.status(400).json('Email does not exist');
            }
            else{
                // Perform checking password
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result === true){
                        res.status(200).json('OK');
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

module.exports = userLogin;