const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Post = require("../models/Post");

router.put("/bookmark/:postId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const postId = req.params.postId;

    const index = user.bookmarks.indexOf(postId);

    if (index === -1) {
      user.bookmarks.push(postId); 
    } else {
      user.bookmarks.splice(index, 1); 
    }

    await user.save();
    res.json({ bookmarked: index === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/bookmarks", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      populate: { path: "author", select: "username" },
    });

    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "bookmarks",
        populate: { path: "author", select: "username" },
      });

    
    const likedPosts = await Post.find({ likes: req.user._id })
      .populate("author", "username")
      .lean();

    res.json({
      ...user.toObject(), 
      likedPosts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;