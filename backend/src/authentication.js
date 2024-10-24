const express = require("express");
const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  //middleware
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("no token found");
  } else {
    jwt.verify(token, "secretjwtkey", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "not authenticated" });
      } else {
        next();
      }
    });
  }
};

module.exports = verifyJWT;
