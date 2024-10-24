const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const User = require("../model/user");
const multer = require("multer");
const upload = multer({});
const sharp = require("sharp");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");
// let newPost = 0;
// let newPostData = "";
let time = Date.now();

cloudinary.config({
  cloud_name: "dmqxcb5haqe",
  api_key: "9755429628483942",
  api_secret: "ju_eZBYOGOJ6P7YL0Heu2IgqN44yV8j7cXnk2DLCYjP0",
});

// getting post data
router.get("/posts", (req, res) => {
  async function sendPosts() {
    const posts = await Post.find({});
    res.send(posts);
  }
  sendPosts();
});

// getting new post stream

router.get("/post/stream", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    sendStream(res, time);
  } catch (e) {
    console.log(e);
  }
});

async function sendStream(res, time) {
  let newPost = await Post.findOne({ timeStamp: { $gt: time } });
  // console.log(time);
  if (newPost) {
    // console.log("stream");
    res.write("data: " + JSON.stringify(newPost) + "\n\n");
    time = Date.now();
  }

  setTimeout(() => sendStream(res, time), 1000);
}

// posting content
router.post("/posts", upload.single("file"), (req, res) => {
  async function pushPost() {
    const postData = req.body;
    console.log(postData);
    try {
      await User.updateOne(
        { username: postData.username },
        { $push: { posts: { ...postData } } }
      );

      const post = new Post(req.body);
      if (req.file !== undefined) {
        // uploading on cloudinary

        let cld_upload_stream = await cloudinary.uploader.upload_stream(
          ({ resource_type: "raw" },
          function (result, error) {
            post.img = result.secure_url;
            Post.create(post);
            console.log(result.secure_url);
            if (error) {
              console.log(error);
            }
          })
        );
        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
      } else {
        Post.create(post);
      }
      res.json();
    } catch (e) {
      console.log(e);
    }
  }
  pushPost();
});

router.delete("/posts/:postId", async (req, res) => {
  try {
    const res = await Post.deleteOne({ _id: req.params.postId });
    console.log("deleted", req.params.postId);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
