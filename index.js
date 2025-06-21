const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");
const analyticsRoutes = require("./routes/analytics");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/simple-blog-v2")
  .then(() => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});


app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Simple Blog Backend is Running");
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
