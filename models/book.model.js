
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bid:{
        type: String,
        unique: true
    },
    bname:String,
    aname:String,
    pname:String,
    isbn:{
        type: String,
        unique: true
    },
    img:{type:String,default:'NA'},
    pdf:{type:String,default:'NA'}
  
});

const Book = new mongoose.model('Book', bookSchema);

module.exports = Book;

