const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Server error" }); // Send error response
    } else {
      req.body.password = hash;
      console.log(req.body.password);
      console.log(req.body);

      const user = new User(req.body);
      console.log(user);
      User.create(user)

        .then(() =>
          res.status(201).json({ message: "User created successfully" })// Success response
        ) 
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error creating user" }); // Error response
        });
    }
  });
});

module.exports = router;
