const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

router.get("/dashboard", async (req, res) => {
  try {
    const [totalUsers, totalPosts, totalComments] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments(),
      Comment.countDocuments(),
    ]);

    const allPosts = await Post.find().populate("author", "username").lean();

    
    const topLikedPost = allPosts.reduce((max, post) => {
      return (post.likes?.length || 0) > (max?.likes?.length || 0) ? post : max;
    }, null);

    
    const userData = await User.find().lean();
    const bookmarkMap = {};
    userData.forEach(user => {
      (user.bookmarks || []).forEach(postId => {
        bookmarkMap[postId] = (bookmarkMap[postId] || 0) + 1;
      });
    });

    const topBookmarkedPostId = Object.entries(bookmarkMap).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topBookmarkedPost = await Post.findById(topBookmarkedPostId).populate("author", "username");

    
    const postCounts = {};
    allPosts.forEach(post => {
      const authorId = post.author?._id?.toString();
      if (authorId) postCounts[authorId] = (postCounts[authorId] || 0) + 1;
    });

    const mostActiveUserId = Object.entries(postCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const mostActiveUser = await User.findById(mostActiveUserId);

    
    const totalLikes = allPosts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);

    res.json({
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      topLikedPost: topLikedPost
        ? {
            title: topLikedPost.title,
            likes: topLikedPost.likes.length,
            author: topLikedPost.author?.username || "Unknown",
          }
        : null,
      topBookmarkedPost: topBookmarkedPost
        ? {
            title: topBookmarkedPost.title,
            bookmarks: bookmarkMap[topBookmarkedPost._id.toString()],
            author: topBookmarkedPost.author?.username || "Unknown",
          }
        : null,
      mostActiveUser: mostActiveUser
        ? {
            username: mostActiveUser.username,
            postCount: postCounts[mostActiveUser._id.toString()],
          }
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
