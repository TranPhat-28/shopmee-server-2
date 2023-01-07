const user = require('../../models/user')

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
    
    // Missing fields
    if (!newPhonenumber || !newAddress){
        res.status(400).json('Missing required field(s)')
    }

    try{
        const information = await user.findOneAndUpdate({email: email}, {phonenumber: newPhonenumber, address: newAddress})
        res.json('Your information has been updated');
    }
    catch(e){
        console.log(e.message);
    }
}

module.exports = {
    fetchContactInformation,
    updateContactInformation
}