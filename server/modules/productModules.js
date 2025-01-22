const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BlogPost = new Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
  oldprice: Number,
  ratings: Number
});

const BlogModel = mongoose.model("products",BlogPost)

module.exports = BlogModel
