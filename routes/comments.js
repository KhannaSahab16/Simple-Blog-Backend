const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createComment,
  getCommentsForPost,
  deleteComment,
} = require("../controllers/commentController");


router.post("/", protect, createComment);


router.get("/:postId", getCommentsForPost);


router.delete("/:id", protect, deleteComment);

module.exports = router;