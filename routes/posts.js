const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");

// Create post
router.post("/", protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
      author: req.user._id // ✅ Critical line
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, sort, author } = req.query;

    let filter = {};

    // 🔍 Search by title or content
    if (search) {
      filter.$or = [
        { title:   { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    // 📋 Filter by author ID
    if (author) {
      filter.author = author;
    }

    // 🔽 Sorting
    let sortOption = { createdAt: -1 }; // Default: Newest first
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const posts = await Post.find(filter)
      .populate("author", "username email")
      .sort(sortOption)
      .lean();

    res.json(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET a specific post by :id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username email")
      .lean(); // returns plain JS object

    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = await Comment.find({ post: post._id })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .lean();

    post.comments = comments;

    res.json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Ownership check
   if (!post.author || post.author.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Not allowed to update this post" });
}

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ Delete Post (Only author)
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Ownership check
    if (!post.author || post.author.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Not allowed to delete this post" });
}

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
