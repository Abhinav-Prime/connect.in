const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/refresh", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("not authenticated , login again");
  } else {
    jwt.verify(token, "refreshtokenkey", (err, user) => {
      if (err) {
        console.log(err);
      } else {
        const username = user.username;
        const accessToken = jwt.sign({ username }, "secretjwtkey", {
          expiresIn: "10m",
        });
        return res.json({ accessToken });
      }
    });
  }
});

module.exports = router;
