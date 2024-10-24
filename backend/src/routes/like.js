const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Post = require("../model/post");

router.get("/like/:postId/:userId", async (req, res) => {
  try {
    console.log(req.params.postId, req.params.userId);
    const post = await Post.findOne({ _id: req.params.postId });
    if (post.likes.includes(req.params.userId)) {
      console.log("pulling");
      await Post.updateOne({_id : req.params.postId},{ $pull : {'likes' : req.params.userId }})
    } else {
      console.log("pushing");
      await Post.updateOne(
        { _id: req.params.postId },
        { $push: { 'likes': req.params.userId } }
      );
    }
    res.json({ status: "ok" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
