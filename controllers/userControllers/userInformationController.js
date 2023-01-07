const user = require('../../models/user');
const bcrypt = require('bcrypt');

const fetchContactInformation = async (req, res) => {
    const email = req.user;
    
    try{
        const information = await user.findOne({email: email}).select('phonenumber address');
        res.json(information);
    }
    catch(e){
        console.log(e.message);
        res.json(e.message);
    }
}

const updateContactInformation = async (req, res) => {
    const email = req.user;
    
    newPhonenumber = req.body.newPhonenumber;
    newAddress = req.body.newAddress;

    try{
        // Missing fields
        if (!newPhonenumber || !newAddress){
            res.status(400).json('Missing required field(s)')
        }
        else{
            const information = await user.findOneAndUpdate({email: email}, {phonenumber: newPhonenumber, address: newAddress})
            res.json('Your information has been updated');
        }
    }
    catch(e){
        console.log(e.message);
        res.status(400).json(e.message);
    }
}

const changePassword = async (req, res) => {
    const email = req.user;
    
    oldPassword = req.body.oldpassword;
    newPassword = req.body.newpassword;
    confirm = req.body.confirm;

    try{
        // Missing field(s)
        if (!oldPassword || !newPassword || !confirm){
            res.status(400).json('Missing required field(s)')
        }
        else if (newPassword !== confirm){
            res.status(400).json('New password and confirmation do not match')
        }
        else{
            // Verify old password
            const userInfo = await user.findOne({email: email}).select('password');
            const result = await bcrypt.compare(oldPassword, userInfo.password);
            // Wrong password
            if (!result){
                res.status(400).json('Wrong old password');
            }
            else{
                const newhash = await bcrypt.hash(confirm, 10);
                await user.findOneAndUpdate({email: email}, {password: newhash});
                res.json('Password changed successfully');
            }
        }
    }
    catch(e){
        console.log(e.message);
        res.status(400).json(e.message);
    }
}

module.exports = {
    fetchContactInformation,
    updateContactInformation,
    changePassword
}