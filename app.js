const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
// require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Mongo connected successfully"))
  .catch((err) => console.log("err"));

const { Article } = require("./models/Article");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/new_blog", (req, res) => {
  const article = new Article(req.body);
  article.save((err, doc) => {
    if (err) {
      res.json({
        success: false,
        err:err,
      });
    }
    res.status(200).json({
      success: true,
      docs: doc,
    });
  });
});

app.get("/blog_post", (req, res) => {
  Article.find({}, (err, blogs) => {
    if (err) {
      return res.status.json({
        error: err,
      });
    }
    return res.status(200).json(blogs);
  });
});

app.get("/blog/:_id", (req, res) => {
  let itemId = req.params._id;
  Article.findOne({ _id: itemId }, (err, doc) => {
    if (err) {
      res.status(400).json({
        success: false,
        data: "Bad request made the article does not exist.",
      });
    }
    res.status(200).json({
      success: true,
      data: doc,
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`app is listning on ${PORT}`);
});
