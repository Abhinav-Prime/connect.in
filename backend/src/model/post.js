const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
  },
  sem: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  text: String,
  name: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
  },
  likes: Array,
  comments: Array,
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
