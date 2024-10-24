const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// login authentication
router.post("/login", (req, res) => {
  const { username, password } = req.body; // Destructuring for cleaner code

  // Log the incoming request for debugging
  console.log(req.body);

  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    // If user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      if (result) {
        const token = jwt.sign({ username: user.username }, "secretjwtkey", {
          expiresIn: "10m",
        });

        const refreshToken = jwt.sign({ username: user.username }, "refreshtokenkey", {
          expiresIn: "7d",
        });

        // Successful login response
        return res.json({
          auth: true,
          token,
          refreshToken,
          result: user,
        });
      } else {
        // Invalid password
        return res.status(401).json({ error: "Authentication failed. Invalid password." });
      }
    });
  });
});

module.exports = router;
