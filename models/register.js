const mongoose = require('mongoose')
const regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique:true
    },

    address: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },


})
const Register = new mongoose.model("Register", regSchema);
module.exports = Register;