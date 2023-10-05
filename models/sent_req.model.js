const mongoose = require('mongoose')
const reqSchema = new mongoose.Schema({
    email: String,         
    bid: String,
    requestDate: Date 



})
const Request = new mongoose.model('Request', reqSchema);

module.exports = Request;