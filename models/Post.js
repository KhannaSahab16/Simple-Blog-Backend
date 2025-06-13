const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
}, {
  timestamps: true
});

module.exports = mongoose.model("Post", postSchema);

