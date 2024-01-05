const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000

const movieSchema = new mongoose.Schema({
    title:String,
    ratings:Number,
    genre:String,
    reviews:Number
});
const movieData = new mongoose.model("movie", movieSchema);
app.get('/', async(req, res) => {
  const search = req.query.q
  const currentPage = Number(req.query.page) || 0
  const limit = Number(req.query.limit) || 5
  const data = {}
  const totalMovies = await movieData.countDocuments()
  let startPosition = currentPage * limit
  let endPosition = (currentPage + 1) * limit
  data.totalMovies = totalMovies
  data.limit = limit
  if(startPosition > 0){
    data.previous = currentPage -1
  }
  if(endPosition < totalMovies){
    data.next = currentPage + 1
  }
if (Number(search)== search){
  const filteredMovies = await movieData.find( {rating: { $regex: new RegExp(search, 'i') }}).sort("rating").skip(startPosition).limit(limit)
  data.result = filteredMovies
  res.json(data)
}else if(search){
  const filteredMovies = await movieData.find( {title: { $regex: new RegExp(search, 'i') }}).sort("title").skip(startPosition).limit(limit)
  data.result = filteredMovies
  res.json(data)
}else if(req.query.sortBy){
  const sortedMovies = await movieData.find().sort(req.query.sortBy).skip(startPosition).limit(limit)
  data.result = sortedMovies
  res.json(data)
}
else{
  const allMovies = await movieData.find().skip(startPosition).limit(limit)
  data.result = allMovies
  res.json(data)
}
})


app.listen(port, async(req, res) => {
  await mongoose.connect("mongodb://127.0.0.1:27017/movieDb").then(() => {
    console.log("connection started");
  }).catch(err => {console.log(err)});
    console.log(`listening on port ${port}`)
});


