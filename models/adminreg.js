const mongoose = require('mongoose')
const regSchema = new mongoose.Schema({
    name1: {
        type: String,
        required: true
    },

    email1: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber1: {
        type: Number,
        required: true,
        unique:true
    },

    address1: {
        type: String,
        required: true
    },

    password1: {
        type: String,
        required: true
    },
    confirmpassword1: {
        type: String,
        required: true
    },


})
const Adminreg = new mongoose.model("Adminreg", regSchema);
module.exports = Adminreg;