const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");


router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/posts/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/comments/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/promote/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: `${user.username} is now an admin`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/freeze/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isFrozen = !user.isFrozen;
  await user.save();

  res.json({
    message: `User ${user.username} is now ${user.isFrozen ? "frozen" : "unfrozen"}`,
  });
});
router.get("/summary", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    const posts = await Post.find().populate("author", "username").lean();
    const comments = await Comment.find().lean();

    const userStats = users.map(user => {
      const userPosts = posts.filter(p => p.author?._id?.toString() === user._id.toString());
      const userComments = comments.filter(c => c.author?.toString() === user._id.toString());
      const userLikes = posts.filter(p => p.likes?.includes(user._id)).length;
      const userBookmarks = user.bookmarks?.length || 0;

      return {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        isFrozen: user.isFrozen,
        totalPosts: userPosts.length,
        totalComments: userComments.length,
        totalBookmarks: userBookmarks,
        likedPosts: userLikes,
      };
    });

    const postStats = posts.map(p => ({
      _id: p._id,
      title: p.title,
      author: p.author?.username || "Unknown",
      likesCount: p.likes?.length || 0,
    }));

    res.json({ userStats, postStats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
