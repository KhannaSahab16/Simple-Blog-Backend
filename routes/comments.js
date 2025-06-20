const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createComment,
  getCommentsForPost,
  deleteComment,
} = require("../controllers/commentController");

// 🔐 Add comment
router.post("/", protect, createComment);

// 📄 Get comments for a post
router.get("/:postId", getCommentsForPost);

// ❌ Delete comment
router.delete("/:id", protect, deleteComment);

module.exports = router;