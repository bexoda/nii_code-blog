const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = Schema(
  {
    title: {
      required: true,
      type: String,
      maxlength: 100,
    },
    subtitle: {
      required: true,
      type: String,
      maxlength: 100,
    },
    date: {
      required:true,
      type: String
    },
    body: {
      required: true,
      type: String,
    },
  },
  { timeStamp: true }
);

const Article = mongoose.model('Article', articleSchema);
module.exports = { Article };
