// controllers/commentController.js
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// ✅ Add a comment
exports.createComment = async (req, res) => {
  const { content, postId } = req.body;

  try {
    const comment = await Comment.create({
      content,
      post: postId,
      author: req.user._id,
    });

    const populatedComment = await comment.populate("author", "username");

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all comments for a post
exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const post = await Post.findById(comment.post);

    // ✅ Allow if user is comment author OR post author
    const isCommentAuthor = comment.author.toString() === req.user._id.toString();
    const isPostAuthor = post.author.toString() === req.user._id.toString();

    if (!isCommentAuthor && !isPostAuthor) {
      return res.status(403).json({ message: "You can't delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};