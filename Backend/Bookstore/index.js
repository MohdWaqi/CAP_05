const express = require('express')
require("dotenv").config()
const mongoose = require('mongoose');
const books = require("./schema/schema")
const {authenticate} = require('../Bookstore/middleware/auth.middleware')
const validator = require('./middleware/validator')
const jwt = require('jsonwebtoken')
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000
const secret = process.env.SECRET 


app.get('/', (req, res) => {
    res.send("WELCOME TO BOOKSTORE MANAGEMENT SYSTEM")
})
app.get('/books',authenticate, async(req, res) => {
    const allBooks = await books.find()
    res.send(allBooks)

})
app.post('/books/add',validator,authenticate, async(req, res) => {
    await books.create(req.body)
    res.send({message: "book added successfully"})
});
app.post('/login', async (req, res) => {
  try {
    const {username, password} = req.query
    const token = jwt.sign({username, password}, secret, { expiresIn: '1h' });
    res.send(token);
    
  } catch (error) {
    res.send(error)
  }
});
app.get("/books/search",authenticate, async(req, res)=>{
    const filterBy = req.query.query;

    if (!filterBy) {
      return res.status(404).send({ message: "query is required for searching book" });
    } else {
      try {
        const foundBooks = await books.find({
          $or: [
            { title: { $regex: new RegExp(filterBy, "i") } },
            { author: { $regex: new RegExp(filterBy, "i") } }
          ]
        });
        res.send(foundBooks);
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
})

app.patch("/books/update/:id",authenticate, async (req, res) => {
    const id = req.params.id;
    const updateData = req.body
    try {
        await books.updateOne({id}, updateData)
        res.send({message: "Updated successfully"})
        
    } catch (error) {
        res.send({ error : error });
    }
})
app.delete("/books/delete/:id",authenticate, async (req, res) =>{
    const id = req.params.id;
    try {
        await books.deleteOne({id})
        res.send({message: "Deleted successfully"})
    } catch (error) {
        res.send({ error : error });
    }

})

app.get("*", async (req, res) =>{
    res.send("<h1 style='text-align:center;margin-top:15%'>404 Page not found</h1>")
})



app.listen(PORT, async(req, res) => {
    await mongoose.connect(process.env.DATABASE_URL).then(() =>{console.log("mongodb connect")}).catch(err => console.log(err))
    console.log(`listening on port ${PORT}`)
})
