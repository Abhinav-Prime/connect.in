const express = require("express");
const router = express.Router();
const verifyJWT = require("../authentication");

router.get("/authTest", verifyJWT, (req, res) => {
  return res.json({ auth: true });
});

module.exports = router;