require("dotenv").config();
require("./db/mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const express = require("express");
const chalk = require("chalk");
const validator = require("validator");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./model/user");
const Post = require("./model/post");
const cors = require("cors");
const sharp = require("sharp");
const authTestRouter = require("./routes/authTest");
const loginRouter = require("./routes/login");
const refreshTokenRouter = require("./routes/refreshToken");
const signUpRouter = require("./routes/signup");
const userRouter = require("./routes/user");
const postRouter = require("./routes/posts");
const likeRouter = require("./routes/like");


const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
  })
);
const port = process.env.PORT || 5000;

// getting posts
app.use(postRouter);
app.use(authTestRouter);
app.use(loginRouter);
app.use(refreshTokenRouter);
app.use(signUpRouter);
app.use(userRouter);
app.use(likeRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
