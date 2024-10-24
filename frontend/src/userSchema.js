"use strict";

const userSchema = new mongoose.Schema({
  addNo: {
    type: String,
    required: true,
    maxLength: 10,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
    max: 8,
    min: 1,
  },
  society: Array,
  skills: Array,
});

module.exports = mongoose.model("User", userSchema);
