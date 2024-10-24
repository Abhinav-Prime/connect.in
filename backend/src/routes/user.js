const express = require("express");
const router = express.Router();
const User = require("../model/user");


router.post('/users', (req, res) => {
    const username = req.body.username;
    async function getUser() {
      try {
        const user = await User.findOne({ username: username });
        res.json(user);
      } catch (e) {
        console.log(e.message);
      }
    }
    getUser();
  });

  module.exports = router