const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/blogdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Simple Blog Backend is Running");
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
