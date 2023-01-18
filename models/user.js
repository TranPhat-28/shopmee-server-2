const mongoose = require('mongoose');

// Define the data schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;