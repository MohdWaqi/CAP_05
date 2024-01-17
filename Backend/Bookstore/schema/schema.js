const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    id: Number,
    title:String,
    author:String,
    ISBN:String
});

const books = mongoose.model("book", bookSchema)

module.exports = books