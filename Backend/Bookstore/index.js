const express = require('express')
const mongoose = require('mongoose');
const books = require("./schema/schema")
const validator = require('./middleware/validator')
const PORT = 8080
const app = express();
app.use(express.json())


app.get('/', (req, res) => {
    res.send("WELCOME TO BOOKSTORE MANAGEMENT SYSTEM")
})
app.get('/books', async(req, res) => {
    const allBooks = await books.find()
    res.send(allBooks)

})
app.post('/books/add',validator, async(req, res) => {
    await books.create(req.body)
    res.send({message: "book added successfully"})
});
app.get("/books/search", async(req, res)=>{
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

app.patch("/books/update/:id", async (req, res) => {
    const id = req.params.id;
    const updateData = req.body
    try {
        await books.updateOne({id}, updateData)
        res.send({message: "Updated successfully"})
        
    } catch (error) {
        res.send({ error : error });
    }
})
app.delete("/books/delete/:id", async (req, res) =>{
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
    await mongoose.connect('mongodb://localhost:27017/bookDb').then(() =>{console.log("mongodb connect")}).catch(err => console.log(err))
    console.log(`listening on port ${PORT}`)
})
