const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");
const User = require("../models/User");


router.post("/", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.isFrozen) {
    return res.status(403).json({ message: "Your account is frozen. You cannot create posts." });
  }
  try {
    const { title, content } = req.body;
    

    const newPost = new Post({
      title,
      content,
      author: req.user._id 
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    let filter = {};

    
    if (search) {
      filter.$or = [
        { title:   { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    
    if (author) {
      filter.author = author;
    }

    
    let sortOption = { createdAt: -1 }; 
    if (sort === "oldest") sortOption = { createdAt: 1 };

   const posts = await Post.find(filter)
    .populate("author", "username email")
    .sort(sortOption)
    .limit(limit)
    .skip(skip)
    .lean();
    
const total = await Post.countDocuments(filter);
const postsWithLikes = posts.map(post => ({
  ...post,
  likesCount: post.likes ? post.likes.length : 0
}));
res.json({ total, page, posts: postsWithLikes });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username email")
      .lean(); 

    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = await Comment.find({ post: post._id })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .lean();

     post.comments = comments;
    post.likesCount = post.likes?.length || 0;


    res.json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

   
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

router.put("/like/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.likes) post.likes = [];

    const userId = req.user._id;
    const index = post.likes.indexOf(userId.toString());

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();

    res.json({
      likesCount: post.likes.length,
      liked: index === -1
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    
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
