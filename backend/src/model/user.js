const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(chalk.red("Invalid email"));
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minLength: 10,
    required: true,
  },
  profilePic: {
    type: String,
    default:
      "https://media-exp1.licdn.com/dms/image/C4D03AQFhOfd-R8SPOQ/profile-displayphoto-shrink_800_800/0/1652042002676?e=1669852800&v=beta&t=RyiFXVGE0Ec23PHWKma8Cswt-eBEjcTcN3pQ-DYCk-8",
  },
  sem: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    uppercase: true,
    
    trim: true,
  },
  skills: {
    type: Array,
  },
  about: {
    type: String,
    trim: true,
  },
  society: {
    type: Array,
  },
  connection: {
    type: Array,
  },
  posts: [
    {
      username: {
        type: String,
        required: true,
      },
      timeStamp: {
        type: Number,
        required: true,
      },
      text: String,
      photo: String,
      video: String,
      audio: String,
      document: String,
      likes: Array,
      comments: Array,
    },
  ],
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
