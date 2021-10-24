const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


app.use(express.urlencoded({extended: true}));
app.use(express.json())

mongoose.Promise = global.Promise;
mongoose
    .connect(MONGO_URI, {useNewUrlParser: true})
    .then(()=>console.log("Mongo connected successfully"))
    .catch(err=> console.log("err"))

const { Article } = require('./models/Article')

app.get('/', (req,res) => {
  res.send("Hello world")
})

app.post('/new_blog', (req, res) => {
  const article = new Article(req.body)
  article.save((err, doc)=> {
    if (err) {
      res.json({
        success: false,
        err
      })
    }
    res.status(200).json({
      success: true,
      docs:doc
    })
  })
})

app.get('/blog_post', (req,res)=> {
  Article.find({}, (err,blogs) => {
    if(err) {
      return res.status.json({
        error: err
      })
    }
    return res.status(200).json(blogs)
  })
})

app.listen("8000", ()=> {
  console.log(`app is listning on ${PORT}`)
})