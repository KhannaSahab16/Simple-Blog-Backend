const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  author:   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to User collection
    required: true,
  }
}, { timestamps: true });
postSchema.virtual("formattedDate").get(function () {
  return new Date(this.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Post", postSchema);


